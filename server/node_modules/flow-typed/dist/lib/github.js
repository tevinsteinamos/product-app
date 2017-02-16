"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gitHubClient = gitHubClient;

var _github = require("github");

var _github2 = _interopRequireDefault(_github);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLIENT = new _github2.default({ version: "3.0.0" });

if (process.env.GH_TOK) {
  CLIENT.authenticate({ type: "oauth", token: process.env.GH_TOK });
}

function gitHubClient() {
  return CLIENT;
};