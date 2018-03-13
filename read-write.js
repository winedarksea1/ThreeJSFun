var fs = require("fs");
var parseOBJ = require("parse-obj");

// parseOBJ(fs.createReadStream("models/Zenith_OBJ.obj"), (err, result) => {
//   if(err) {
//     throw new Error("Error parsing OBJ file: " + err);
//   } else {
//     console.log(result);
//     var json = JSON.stringify(result);
//     fs.writeFile("zenith.json", json, function (err) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("Data was succesfully written!!");
//       }
//     });
//   }
// });

fs.readFile('server.js', "utf8", (err, data) => {
  if (err) {
    console.log("err");
    throw new Error("Error parsing file");
  }

  // console.log(data);
  var app = data.search(/app/g);
  console.log(app);

  var dataString = data.toString();
  // console.log(dataString);
  var dataArr = dataString.split('\n');
  // console.log(dataArr);

  var newArr = dataArr.map(line => {
    if (line.search(/var/) != -1) {
      console.log("Var Found");
      return line.replace(/var/gi, 'let');
    } else {
      return line;
    }
  });

  var resultString = newArr.join('\n');
  console.log(resultString);

  fs.writeFile('newServer.js', resultString, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data) {
      console.log("Data succesfully written")
    }

  });
});
