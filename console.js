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
}
// executeAfterWait();
