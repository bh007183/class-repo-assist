const fs = require("fs");
const path = require("path");
const initialpath =
  "/Users/benhopkins/UWBootCamp/instructorrepo/fullstack-online/01-Class-Content";
// async function Modules(path){

//     const folders = await fs.readdirSync(path)

//     folders.forEach(folder => {
//         if(folder != "solved" || folder != "main"){
//            Modules(path + "/" + folder)
//         }
//     })

// }

var copyRecursiveSync = function (src, dest) {
  
  var exists = fs.existsSync(src);
  var stats = exists && fs.statSync(src);
  var isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    fs.mkdirSync(dest);
    fs.readdirSync(src)
    .filter(name => name !== "Solved" && name !== "Main" && name !== "main" && name !== "solved")
    .forEach(function (childItemName) {
        copyRecursiveSync(
          path.join(src, childItemName),
          path.join(dest, childItemName)
        );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};
copyRecursiveSync(
  "/Users/benhopkins/UWBootCamp/instructorrepo/fullstack-ground/01-Class-Content",
  "./otter"
);
