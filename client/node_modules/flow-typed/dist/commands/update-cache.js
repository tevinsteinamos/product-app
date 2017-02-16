"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.name = undefined;
exports.setup = setup;
exports.run = run;

var _libDefs = require("../lib/libDefs");

var name = exports.name = 'update-cache';

var description = exports.description = 'Updates the flow-typed definitions cache';

function setup(yargs) {
  return yargs.usage("$0 " + name + " - " + description).options({
    debug: {
      describe: 'Enables verbose messages for the update procedure',
      alias: 'd',
      type: 'boolean',
      demand: false
    }
  });
};

function run(argv) {
  var verbose;
  return regeneratorRuntime.async(function run$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          verbose = void 0;


          if (argv.debug) {
            verbose = process.stdout;
          }

          console.log('Updating flow-typed definitions...');
          _context.next = 6;
          return regeneratorRuntime.awrap((0, _libDefs.updateCacheRepo)(verbose));

        case 6:

          console.log('Definitions update successful!');
          return _context.abrupt("return", 0);

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);

          console.error("Update failed: " + _context.t0.message);

          if (argv.debug) {
            console.error(_context.t0);
          }

          return _context.abrupt("return", 1);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, this, [[0, 10]]);
}