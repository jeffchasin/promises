/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  fs.readFile(filePath, function (err, data) {
    if (err) {
      callback(err, null);
    } else {
      let body = '';
      body += data;
      body = body.split('\n');
      callback(null, body[0]);
    }
  });
};
/*
it('should invoke the callback with the first line as the second argument', function(done) {
      pluckFirstLineFromFile(__dirname + '/../files/file_to_read.txt', function(err, firstLine) {
        expect(firstLine).to.equal('This is a file to read');
        expect(err).to.not.exist;
        done();
      });
    });
*/

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  // TODO
  request(url, function (error, response, body) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, response.statusCode);
    }
  });

};

/*
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

*/




// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
