const path = require("path");
const fs = require("fs");

const directoryPath = path.join(__dirname, "../source");
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log("Can not read directory: ", err);
  }
  files.map(item => console.log(item));
});

// module.exports = { directoryPath };
