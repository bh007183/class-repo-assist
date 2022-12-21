///Users/benhopkins/UWBootCamp/instructorrepo/fullstack-ground/02-Lesson-Plans/Part-Time
const fs = require("fs");
const path = require("path");
var copyRecursiveSync = function (src, dest) {
  
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();
    let arr = []
  
    if (isDirectory) {
      fs.mkdirSync(dest);
      fs.readdirSync(src)
      .forEach(function (childItemName) {
          copyRecursiveSync(
            path.join(src, childItemName),
            path.join(dest, childItemName)
          );
      });
    } else {
      if(!src.includes("README")){
        let grandparent = src.split("/")[8]
        let parent = src.split("/")[9]
        let data = fs.readFileSync(src, "utf-8")
        
            let words = data.split(/[\s\/\`\[\]\(\)]/)
            let days = words.filter(data => data.includes("-Ins_") || data.includes("-Stu_"))
            let lessons = [...new Set(days)];
          let obj = {
            grandparent,
            parent,
            lessons: lessons.sort()
          }
          arr.push(obj)

          
      }
     
    }
    console.log(arr)
  };
  copyRecursiveSync(
    "/Users/benhopkins/UWBootCamp/instructorrepo/fullstack-ground/02-Lesson-Plans/Part-Time",
    "./otter"
  );
  