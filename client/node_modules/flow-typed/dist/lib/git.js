'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloneInto = cloneInto;
exports.findLatestFileCommitHash = findLatestFileCommitHash;
exports.rebaseRepoMaster = rebaseRepoMaster;

var _which = require('which');

var _which2 = _interopRequireDefault(_which);

var _node = require('./node');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function which(executable) {
  return new Promise(function (res, rej) {
    (0, _which2.default)(executable, function (err, resolvedPath) {
      if (err) {
        rej(err);
      } else {
        res(resolvedPath);
      }
    });
  });
}

function getGitPath() {
  return regeneratorRuntime.async(function getGitPath$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(which('git'));

        case 3:
          return _context.abrupt('return', _context.sent);

        case 6:
          _context.prev = 6;
          _context.t0 = _context['catch'](0);
          throw new Error('Unable to find ' + '`' + 'git' + '`' + ' installed on this system: ' + _context.t0.message);

        case 9:
        case 'end':
          return _context.stop();
      }
    }
  }, null, this, [[0, 6]]);
};

function cloneInto(gitURL, destDirPath) {
  var gitPath;
  return regeneratorRuntime.async(function cloneInto$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getGitPath());

        case 2:
          gitPath = _context2.sent;
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(_node.child_process.spawnP(gitPath, ['clone', gitURL, destDirPath]));

        case 6:
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2['catch'](3);
          throw new Error('Error cloning repo: ' + _context2.t0.message);

        case 11:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, this, [[3, 8]]);
};

function findLatestFileCommitHash(repoPath, filePath) {
  var gitPath, _ref, stdout;

  return regeneratorRuntime.async(function findLatestFileCommitHash$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(getGitPath());

        case 2:
          gitPath = _context3.sent;
          _context3.prev = 3;
          _context3.next = 6;
          return regeneratorRuntime.awrap(_node.child_process.spawnP(gitPath, ['log', "--pretty=%H", filePath], { cwd: repoPath }));

        case 6:
          _ref = _context3.sent;
          stdout = _ref.stdout;
          return _context3.abrupt('return', stdout.trim());

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3['catch'](3);
          throw new Error('Error finding latest commit hash for ' + filePath + ': ' + _context3.t0.message);

        case 14:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, this, [[3, 11]]);
};

function rebaseRepoMaster(repoDirPath) {
  var gitPath, stderr;
  return regeneratorRuntime.async(function rebaseRepoMaster$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(getGitPath());

        case 2:
          gitPath = _context4.sent;
          _context4.next = 5;
          return regeneratorRuntime.awrap(_node.child_process.spawnP(gitPath, ['checkout', 'master'], { cwd: repoDirPath }).catch(function (_ref2) {
            var stderr = _ref2.stderr;

            throw new Error('Error checking out the `master` branch of the following repo:\n' + (repoDirPath + '\n\n' + stderr));
          }));

        case 5:
          _context4.prev = 5;
          _context4.next = 8;
          return regeneratorRuntime.awrap(_node.child_process.execFileP(gitPath, ['pull', '--rebase'], { cwd: repoDirPath }));

        case 8:
          _context4.next = 14;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4['catch'](5);
          stderr = _context4.t0.stderr;
          throw new Error('Error rebasing the `master` branch of the following repo:\n' + (repoDirPath + '\n\n' + stderr));

        case 14:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, this, [[5, 10]]);
};