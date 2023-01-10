const { exec } = require("child_process");
async function command(){
    try{
        await exec("cd ~/UWBootCamp/studentrepo/UW-VIRT-FSF-PT-12-2022-U-LOLC");
        await exec("git add .");
        await exec("git commit -m 'pushed folders'");
        await exec("git push");
    }catch(err){
        console.log("error")
        console.log(err)
    }
}

command()