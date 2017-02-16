'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.url = exports.path = exports.os = exports.https = exports.fs = exports.child_process = undefined;

var _child_process = require('child_process');

var node_child_process = _interopRequireWildcard(_child_process);

var _fs = require('fs');

var node_fs = _interopRequireWildcard(_fs);

var _https = require('https');

var node_https = _interopRequireWildcard(_https);

var _os = require('os');

var node_os = _interopRequireWildcard(_os);

var _path = require('path');

var node_path = _interopRequireWildcard(_path);

var _url = require('url');

var node_url = _interopRequireWildcard(_url);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var child_process = exports.child_process = {
  exec: node_child_process.exec,
  execP: function execP(command, options) {
    return new Promise(function (res, rej) {
      node_child_process.exec(command, options, function (err, stdout, stderr) {
        if (err) {
          rej(err);
        } else {
          res({ stdout: stdout, stderr: stderr });
        }
      });
    });
  },
  execFileP: function execFileP(command, argsOrOptions, options) {
    var _args = void 0;
    var _opts = void 0;

    if (Array.isArray(argsOrOptions)) {
      _args = argsOrOptions;
      _opts = options ? options : {};
    } else {
      _args = [];
      _opts = argsOrOptions ? argsOrOptions : {};
    }

    return new Promise(function (res, rej) {
      node_child_process.execFile(command, _args, _opts, function (err, stdout, stderr) {
        if (err) {
          rej(err);
        } else {
          res({ stdout: stdout, stderr: stderr });
        }
      });
    });
  },
  spawnP: function spawnP(command, args, options) {
    return new Promise(function (res, rej) {
      var process = node_child_process.spawn(command, args, options);
      var stderr = '';
      var stdout = '';
      process.stdout.on('data', function (chunk) {
        return stdout += chunk;
      });
      process.stderr.on('data', function (chunk) {
        return stderr += chunk;
      });
      process.on('close', function (exitCode) {
        if (exitCode === 0) {
          res({ stderr: stderr, stdout: stdout, exitCode: exitCode });
        } else {
          rej({ stderr: stderr, stdout: stdout, exitCode: exitCode });
        }
      });
    });
  }
};

var fs = exports.fs = {
  createReadStream: node_fs.createReadStream,
  createWriteStream: node_fs.createWriteStream,
  exists: function exists(path) {
    var exists;
    return regeneratorRuntime.async(function exists$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            exists = true;
            _context.prev = 1;
            _context.next = 4;
            return regeneratorRuntime.awrap(fs.stat(path));

          case 4:
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context['catch'](1);
            exists = false;

          case 9:
            return _context.abrupt('return', exists);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, null, this, [[1, 6]]);
  },
  mkdir: function mkdir(path, mode) {
    return new Promise(function (res, rej) {
      node_fs.mkdir(path, mode, function (err) {
        if (err) {
          rej(err);
        } else {
          res();
        }
      });
    });
  },
  readdir: function readdir(path) {
    return new Promise(function (res, rej) {
      node_fs.readdir(path, function (err, items) {
        if (err) {
          rej(err);
        } else {
          res(items);
        }
      });
    });
  },
  readFile: function readFile(f, opts) {
    return new Promise(function (res, rej) {
      node_fs.readFile(f, opts || {}, function (err, data) {
        if (err) {
          rej(err);
        } else {
          res(data);
        }
      });
    });
  },
  rename: function rename(oldPath, newPath) {
    return new Promise(function (res, rej) {
      node_fs.rename(oldPath, newPath, function (err) {
        if (err) {
          rej(err);
        } else {
          res();
        }
      });
    });
  },
  rmdir: function rmdir(path) {
    return new Promise(function (res, rej) {
      node_fs.rmdir(path, function (err) {
        if (err) {
          rej(err);
        } else {
          res();
        }
      });
    });
  },
  stat: function stat(path) {
    return new Promise(function (res, rej) {
      node_fs.stat(path, function (err, stats) {
        if (err) {
          rej(err);
        } else {
          res(stats);
        }
      });
    });
  },
  statSync: node_fs.statSync,
  Stats: node_fs.Stats,
  unlink: function unlink(path) {
    return new Promise(function (res, rej) {
      node_fs.unlink(path, function (err) {
        if (err) {
          rej(err);
        } else {
          res();
        }
      });
    });
  },
  writeFile: function writeFile(f, data, opts) {
    return new Promise(function (res, rej) {
      node_fs.writeFile(f, data, opts, function (err) {
        if (err) {
          rej(err);
        } else {
          res();
        }
      });
    });
  }
};
var https = exports.https = node_https;
var os = exports.os = node_os;
var path = exports.path = node_path;
var url = exports.url = node_url;