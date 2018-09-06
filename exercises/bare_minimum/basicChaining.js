/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var octokit = require('@octokit/rest');



var fetchProfileAndWriteToFile = function (readFilePath, writeFilePath) {
  // TODO
  console.log('octokit: ', octokit);
  return new Promise(function (resolve, reject) {
    fs.readFile(readFilePath, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let body = '';
        body += data;
        body = body.split('\n');
        resolve(body[0]);
      }
    });
  }).then(function (githubUserName) {
    console.log('githubUserName: ', githubUserName);
    return new Promise(function (resolve, reject) {

      // TODO: FIX GITHUB API SEARCH SYNTAX

      octokit.search.users({ q: githubUserName }, function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }).then(function (githubProfile) {
    var profile = JSON.parse(githubProfile);
    fs.writeFile(writeFilePath, function(err) {
      if (err) {
        throw new Error('Error writing file');
      }
    });
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
