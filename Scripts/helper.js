// This script contains basics function (reading, cutting files, ...)

let verboseMode=true; // More things will be printed to the console

async function ReadFile(fileName)
{
    verbosePrint("Reading file : " + fileName);
    try {
        const file = await fetch(fileName);
        return await file.text();
    } catch (error) {
        printError("Could not read : " + fileName + ". " + error.message); 
    }
}


async function ReadAndCutFile(fileName)
{
    const content = await ReadFile(fileName);
    if (content.includes("\r")) // depend if it uses LF or CRLF
    {
        return content.split("\r\n"); // To remove "retour chariot" on local host
    }else
    {
        return content.split("\n"); // To remove "retour chariot" on github page
    }
}


function verbosePrint(message)
{
    if (verboseMode) {
        console.log(message);
    }
}

function printError(error)
{
    console.error(error);
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
} 

function getRandomIntInRange(min, max) {
    return min + Math.floor(Math.random() * (max+min));
} 