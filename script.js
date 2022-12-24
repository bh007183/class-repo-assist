const fs = require("fs");
const path = require("path");
const weeksArray = require("./weeks")
const initialpath =
  "/Users/benhopkins/UWBootCamp/instructorrepo/fullstack-online/01-Class-Content";

function copyRecursiveSync(src, dest) {
  var exists = fs.existsSync(src);
  var stats = exists && fs.statSync(src);
  var isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    fs.mkdirSync(dest);
    fs.readdirSync(src)
      .filter(
        (name) =>
          name !== "Solved" &&
          name !== "Main" &&
          name !== "main" &&
          name !== "solved"
      )
      .forEach(function (childItemName) {
        
        copyRecursiveSync(
          path.join(src, childItemName),
          path.join(dest, childItemName)
        );
      });
  } else {
    fs.copyFileSync(src, dest);
  }
}
copyRecursiveSync(
  "/Users/benhopkins/UWBootCamp/instructorrepo/fullstack-ground/01-Class-Content/" + getLatestWeek('/Users/benhopkins/UWBootCamp/studentrepo/UW-VIRT-FSF-PT-12-2022-U-LOLC'),
  '/Users/benhopkins/UWBootCamp/studentrepo/UW-VIRT-FSF-PT-12-2022-U-LOLC/' + getLatestWeek('/Users/benhopkins/UWBootCamp/studentrepo/UW-VIRT-FSF-PT-12-2022-U-LOLC'));

function getLatestWeek(studentRepo) {
  var exists = fs.existsSync(studentRepo);
  var stats = exists && fs.statSync(studentRepo);
  var isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    let folders = fs
      .readdirSync(studentRepo)
      .filter((childItemName) => childItemName.match(/\d/));
    // let lastWeekInStudentRepo = folders[folders.length - 1]
    // returns vallue for week that needs to be pushed up
    return weeksArray[folders.length]
  }

}

console.log(getLatestWeek('/Users/benhopkins/UWBootCamp/studentrepo/UW-VIRT-FSF-PT-12-2022-U-LOLC'))
