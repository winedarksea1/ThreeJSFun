var fs = require("fs");
var parseOBJ = require("parse-obj");

parseOBJ(fs.createReadStream("models/Zenith_OBJ.obj"), (err, result) => {
  if(err) {
    throw new Error("Error parsing OBJ file: " + err);
  } else {
    console.log(result);
    var json = JSON.stringify(result);
    fs.writeFile("zenith.json", json, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Data was succesfully written!!");
      }
    });
  }
});
