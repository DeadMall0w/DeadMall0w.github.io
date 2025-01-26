const delay = ms => new Promise(res => setTimeout(res, ms));


function ClearConsole()
{
    const elements = document.getElementsByClassName("command");
    while(elements.length > 0)
    {
        elements[0].remove();
    }
}

function ShowLine(text)
{
   const para = document.createElement("p");
    const node = document.createTextNode(text);
    para.appendChild(node);
    const element = document.getElementById("commandsContainer");
    para.classList.add("command");
    element.appendChild(para);
}

ClearConsole();
/*
ShowLine("Hello, world !");
ShowLine("Hello, world !");
ShowLine("Hello, world !");
ShowLine("Hello, world !");
ShowLine("Hello, world !");
ShowLine("Hello, world !");
ShowLine("Hello, world !");
ShowLine("Hello, world !");
ShowLine("Hello, world !");*/


function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function executeAfterWait() {
    await wait(4000); // Wait for 4 seconds
    console.log("4 seconds have passed!");
    ShowLine("Done !");
}


async function LoadInitText()
{
    //TODO: RANDOM PART

    const file = await fetch("commandInitText.txt");
    const content = await file.text();
    const lines = content.split("\r\n"); // To remove "retour chariot"

    for (let index = 0; index < lines.length; index++) {
        if (lines[index].length >= 2){
            if (lines[index][0]=='[' && lines[index][1] == '[')
            {
                if (CompareArguments(lines[index], "wait"))
                {
                    await wait(500); // Wait for 4 seconds
                }
                continue;
            }
        }
        ShowLine(lines[index]);   
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


LoadInitText();
// executeAfterWait();
