'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.name = undefined;
exports.setup = setup;
exports.run = run;

var _stubUtils = require('../lib/stubUtils.js');

var _flowProjectUtils = require('../lib/flowProjectUtils.js');

var name = exports.name = 'create-stub';
var description = exports.description = 'Creates a libdef stub for an untyped npm package';

function setup(yargs) {
  return yargs.usage('$0 ' + name + ' ...PACKAGE').options({
    overwrite: {
      default: false,
      alias: 'o',
      describe: 'Overwrite an existing stub if it is already present in the ' + '`flow-typed` directory and has been modified',
      type: 'bool',
      demand: false
    }
  }).example('$0 create-stub foo@^1.2.0').example('$0 create-stub foo bar baz').help('h');
};

function failWithMessage(message) {
  console.error(message);
  return 1;
}

function run(args) {
  var packages, projectRoot, plural, results;
  return regeneratorRuntime.async(function run$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(!Array.isArray(args._) || args._.length < 2)) {
            _context.next = 2;
            break;
          }

          return _context.abrupt('return', failWithMessage('Please provide the names of one or more npm packages'));

        case 2:
          packages = args._.slice(1);

          // Find the project root

          _context.next = 5;
          return regeneratorRuntime.awrap((0, _flowProjectUtils.findFlowRoot)(process.cwd()));

        case 5:
          projectRoot = _context.sent;

          if (!(projectRoot == null)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt('return', failWithMessage('\nERROR: Unable to find a flow project in the current dir or any of ' + 'it\'s parents!\nPlease run this command from within a Flow project.'));

        case 8:
          plural = packages.length > 1 ? 'stubs' : 'stub';

          console.log('\u2022 Creating ' + packages.length + ' ' + plural + '...');
          _context.next = 12;
          return regeneratorRuntime.awrap(Promise.all(packages.map(function (pkg) {
            var version = null;

            /* Four cases to consider
             * packageName
             * packageName@version
             * @scoped/packageName
             * @scoped/packageName@version
             */
            var parts = pkg.split(/@/);
            var packageName = parts[0];
            if (parts[0] === "") {
              // Scoped package
              packageName = "@" + parts[1];
              parts = parts.slice(1);
            }
            if (parts.length > 1) {
              version = parts[1];
            }

            return (0, _stubUtils.createStub)(projectRoot, packageName, version, args.overwrite);
          })));

        case 12:
          results = _context.sent;
          return _context.abrupt('return', results.every(Boolean) ? 0 : 1);

        case 14:
        case 'end':
          return _context.stop();
      }
    }
  }, null, this);
}