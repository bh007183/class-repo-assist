const fs = require("fs");
const path = require("path");
const weeksArray = require("./weeks");
const dailyBreakDown = require("./lesson-plan");
let lessonPlans = dailyBreakDown();
console.log(lessonPlans)
const initialpath =
  "/Users/benhopkins/UWBootCamp/instructorrepo/fullstack-online/01-Class-Content";

function copyRecursiveSync(src, dest) {
  var exists = fs.existsSync(src);
  var stats = exists && fs.statSync(src);
  var isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    
    
    
      fs.mkdirSync(dest, {recursive: true})
  
    fs.readdirSync(src)
      .filter(
        (name) =>
          name !== "Solved" &&
          name !== "Main" &&
          name !== "main" &&
          name !== "solved"
      )
      .forEach(function (childItemName) {
        let val;
        if(src.split("/01-Class-Content/")[1].split("/01-Activities/").length > 1){
            val = src.split("/01-Class-Content/")[1].split("01-Activities")[1].slice(1,3)
           
        }
        if (src.split("/")[src.split("/").length -1].includes("01-Activities")) {

        
            let week = src.split("/01-Class-Content/")[1]
         
            let currentLessonPlans = lessonPlans.filter(item => item.grandparent.slice(0,2) === week.slice(0,2))
         
            if(currentLessonPlans[0].parent.slice(0,2) === '01' && currentLessonPlans[0].lessons.includes(Number(childItemName.slice(0,2)))){
              copyRecursiveSync(
                path.join(src, childItemName),
                path.join(dest +'/01-Day/', childItemName)
              );
            }

            if(currentLessonPlans[1].parent.slice(0,2) === '02' && currentLessonPlans[1].lessons.includes(Number(childItemName.slice(0,2)))){
              copyRecursiveSync(
                path.join(src, childItemName),
                path.join(dest +'/02-Day/', childItemName)
              );
            }
            if(currentLessonPlans[2].parent.slice(0,2) === '03' && currentLessonPlans[2].lessons.includes(Number(childItemName.slice(0,2)))){
              copyRecursiveSync(
                path.join(src, childItemName),
                path.join(dest +'/03-Day/', childItemName)
              );
            
          }
        }else{
          copyRecursiveSync(
            path.join(src, childItemName),
            path.join(dest, childItemName)
          );
        }
      
            
          
       
    
            })
  } else {
   

    // console.log(src)
    fs.copyFileSync(src, dest);
  }
}
copyRecursiveSync(
  "/Users/benhopkins/UWBootCamp/instructorrepo/fullstack-ground/01-Class-Content/" +
    getLatestWeek(
      "/Users/benhopkins/UWBootCamp/studentrepo/UW-VIRT-FSF-PT-12-2022-U-LOLC"
    ),
  "/Users/benhopkins/UWBootCamp/studentrepo/UW-VIRT-FSF-PT-12-2022-U-LOLC/" +
    getLatestWeek(
      "/Users/benhopkins/UWBootCamp/studentrepo/UW-VIRT-FSF-PT-12-2022-U-LOLC"
    )
);

function getLatestWeek(studentRepo) {
  var exists = fs.existsSync(studentRepo);
  var stats = exists && fs.statSync(studentRepo);
  var isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    let folders = fs
      .readdirSync(studentRepo)
      .filter((childItemName) => childItemName.match(/\d/));
    return weeksArray[folders.length];
  }
}
