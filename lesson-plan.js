///Users/benhopkins/UWBootCamp/instructorrepo/fullstack-ground/02-Lesson-Plans/Part-Time
const fs = require("fs");
const path = require("path");
let arr = []
var DailyLessonObjGenerator = function (src, dest) {
  
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();
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
      if(src.includes("LESSON")){
        // Gets week folder name
        let grandparent = src.split("/")[8]
        // Gets day folder name
        let parent = src.split("/")[9]
        // reads file
        let data = fs.readFileSync(src, "utf-8")

        // captures sentance that tells us what lessons belong to what days
        let reg = new RegExp("(In this lesson, students will complete activities .*through.*`)")
        let words = data.split(reg)
         
        // captures first lesson number of day
        let start  = new String(words[1]).match(/\d/g)
        if(start){
           start = start.join("").slice(0,2)
        } 
        // captures last lesson number of day
        let end  = new String(words[1]).match(/\d/g) 
        if(end){
          end = end.join("").slice(2)
        }

    
        // creates array with all lesson numbers for that day
        let lessons = []
      
        for(let i = Number(start); i<= Number(end); i++){
           lessons.push(i)
        }
        
        
       
            //object containing all leson numbers, day, and week data
          let obj = {
            grandparent,
            parent,
            lessons: lessons
          }
          arr.push(obj)

          
      }
     
    }
    

  };
  DailyLessonObjGenerator(
    "/Users/benhopkins/UWBootCamp/instructorrepo/fullstack-ground/02-Lesson-Plans/Part-Time",
    "./otter"
  );
  console.log(arr)
  