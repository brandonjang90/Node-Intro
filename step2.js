const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path){
    fs.readFile(path, 'utf8', function (err,data){
        if(err){
            console.error('ERROR', err);
            process.exit(1)
        } else{
        console.log(data);
    }
    });
}

async function webCat(url){
    try{
    const res = await axios.get(url);
    console.log(res.data);}
    catch (err){
        console.error('ERROR!', err);
        process.exit(1);
    }
}

const arg = process.argv[2];

if (!arg) {
    console.error('ERROR!');
    process.exit(1);
}

if (arg.startsWith('http://') || arg.startsWith('https://')) {
    webCat(arg);
} else {
    cat(arg);
}