const { exec } = require("child_process");
async function command(){
    try{
        await exec("cd ~/UWBootCamp/studentrepo/");
        await exec("git add .");
        await exec("git commit -m 'pushed solved folders'");
        await exec("git push");
    }catch(err){
        console.log("error")
        console.log(err)
    }
}

command()