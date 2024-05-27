const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path, out){
    fs.readFile(path, 'utf8', function (err,data){
        if(err){
            console.error('ERROR', err);
            process.exit(1)
        } else{
            handleOutput(data, out);
        }
    });
}

async function webCat(url, out){
    try {
    const res = await axios.get(url);
    handleOutput(res.data, out);
    }   catch (err){
        console.error('ERROR!', err);
        process.exit(1);
    }
}

function handleOutput(data, out) {
    if (out) {
        fs.writeFile(out, data, 'utf8', (err) => {
            if (err) {
                console.error('ERROR', err);
                process.exit(1);
            }
        });
    } else {
        console.log(data);
    }
}

function isUrl(path) {
    return path.startsWith('http://') || path.startsWith('https://');
}

function handleArguments(args) {
    let out = null;
    let path;

    if (args[2] === '--out') {
        out = args[3];
        path = args[4];
    } else {
        path = args[2];
    }

    if (!path) {
        console.error('ERROR!');
        process.exit(1);
    }

    if (isUrl(path)) {
        webCat(path, out);
    } else {
        cat(path, out);
    }
}

const args = process.argv;

handleArguments(args);