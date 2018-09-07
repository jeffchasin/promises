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
var request = require('request');

var fetchProfileAndWriteToFile = function (readFilePath, writeFilePath) {
  // TODO
  //console.log('octokit: ', Octokit);
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
    return new Promise(function (resolve, reject) {
      var options = {
        url: 'https://api.github.com/users/' + githubUserName,
        headers: { 'User-Agent': 'request' },
        json: true  // will JSON.parse(body) for us
      };

      request.get(options, function (err, res, body) {
        if (err) {
          reject(err);
        } else if (body.message) {
          reject(new Error('Failed to get GitHub profile: ' + body.message));
        } else {
          resolve(body);
        }
      });
      // Octokit.search.users({ q: 'danthareja' }, function (err, res) {
      //   console.log('res: ', JSON.parse(res));
      //   var profile = JSON.parse(githubProfile);
      //   fs.writeFile(writeFilePath, profile, function (err) {
      //     if (err) {
      //       throw new Error('Error writing file');
      //     }
      //   });
      //   if (err) {
      //     console.log('line 39 err: ', err);
      //     reject(err);
      //   } else {
      //     console.log('res: ', res);
      //     resolve(res);
      //   }
      // });
      // });
    }).then(function (githubProfile) {
      var profile = JSON.stringify(githubProfile);
      fs.writeFileSync(writeFilePath, profile, function (err) {
        if (err) {
          throw new Error('Error writing file');
        }
      });
    }).catch(function (err) {
      console.error('Catch error here.', err);
    });
  });
};
// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};