let inputFieldConsole = document.getElementById("input-field")

let commands;

inputFieldConsole.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        ShowLine("> "+inputFieldConsole.value);
        ProcessCommand(inputFieldConsole.value);
        inputFieldConsole.value = "";
    }
});

async function LoadFunctions()
{
    const files = await fetch("Content/Commands/commands.txt");
    const content = await files.text();
    commands = content.split("\n"); // To remove "retour chariot"
    console.log(commands)
}


async function ProcessCommand(command)
{
    for (let i = 0; i < commands.length; i++) {
        if (commands[i] == command)
        {
            console.log(command);
            const files = await fetch("Content/Commands/" + command + ".txt");
            const content = await files.text();
            const commandLines = content.split("\n"); // To remove "retour chariot"
            console.log(commandLines);
        }
    }
    switch (command) {
        case "ping":
            ShowLine("pong")
            break;
    
        default:
            break;
    }
}

function ClearConsole()
{
    const elements = document.getElementsByClassName("command");
    while(elements.length > 0)
    {
        elements[0].remove();
    }
}

function ShowLine(text, color)
{   
   const para = document.createElement("p");
    const node = document.createTextNode(text);
    para.appendChild(node);
    const element = document.getElementById("commandsContainer");
    para.classList.add("command");
    //? Use a switch ?
    if (color == 1)
    {
        para.classList.add("green");
    }else if(color == 2)
    {
        para.classList.add("red");
    }
    element.appendChild(para);
}

ClearConsole();

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function LoadInitText()
{
    const filesName = await ReadAndCutFile("Content/InitTexts/commandInitText.txt");
    const r = getRandomInt(filesName.length);
    const lines = await ReadAndCutFile("Content/InitTexts/" + filesName[r]);
    
    let color = 0; // 0 : no color, 1 : green, 2 : red, 3 : yellow, TODO : ADD MORE COLORS
    for (let index = 0; index < lines.length; index++) {
        if (lines[index].length >= 2){
            if (lines[index][0]=='[' && lines[index][1] == '[')
                {
                if (CompareArguments(lines[index], "wait"))
                {
                    console.log("wait...");
                    await wait(getRandomIntInRange(300, 1200));
                }else if (CompareArguments(lines[index], "green"))
                {
                    color = 1;
                }else if (CompareArguments(lines[index], "red"))
                {
                    color = 2;
                }
                continue;
            }
        }
        ShowLine(lines[index], color);  
        color = 0; // reset color 
    }
}

function CompareArguments(arg1, arg2)
{
    if(arg1.length - 4 != arg2.length){
        return false;
    }

    for (let index = 0; index < arg2.length; index++) {
        if(arg1[index+2]!=arg2[index])
        {
            return false;
        }
        
    }
    return true;
}

LoadFunctions();
LoadInitText();
// executeAfterWait();
