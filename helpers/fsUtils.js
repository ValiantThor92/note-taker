const fs = require('fs');
const util = require('util');


//fs.readFile promise version
const readFromFile = util.promisify(fs.readFile);
/** function to write data to the json file if it contains content and given a destination
* @param {string} destination desired file to write too
* @param {object} content desired content to be written to file
* @returns {void} returns nothing
*/

const writeToFile = (destination, content) =>
fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
  err ? console.error(err) : console.info(`\nData written to ${destination}`)
);

/** function to read data from file and append data
* @param {object} content desired content to be appended
* @param {string} file desired file path
* @returns {void} returns nothing
*/

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) =>{
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };