let inputFieldConsole = document.getElementById("input-field")

let commands;
let finishLoading = true; // temporaire pour que le debug soit plus rapide
inputFieldConsole.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        if (finishLoading) {
            let now = new Date();
            let hours = now.getHours().toString().padStart(2, '0');
            let minutes = now.getMinutes().toString().padStart(2, '0');
            let timeStr = `[${hours}:${minutes}]$ `;

            ShowLine(timeStr + inputFieldConsole.value, 3);
            ProcessCommand(inputFieldConsole.value);
            inputFieldConsole.value = "";
        }
    }
});


async function LoadFunctions() {
    const files = await fetch("Content/Commands/commands.txt");
    const content = await files.text();
    commands = content.split("\n"); // To remove "retour chariot"
    console.log(commands)
}
async function ProcessCommand(command) {
    command = command.trim();
    const [cmd, ...args] = command.split(" ");
    // cmd is the command, args is an array of arguments

    if (commands.includes(cmd)) {
        try {
            await ShowCommandFile("Content/Commands/" + cmd + ".txt");
        } catch (e) {
            ShowLine("Erreur lors du chargement de la commande.", 2);
        }
    } else if (cmd === "sudo") {
        ShowLine("Sorry, Permissions denied.", 2);
    } else {
        switch (cmd) {
            case "ping":
                ShowLine("pong");
                break;
            case "help":
                ShowLine("Work in progress...");
                break;
            case "echo":
                if (args.length > 0) {
                    ShowLine(args.join(" "));
                } else {
                    ShowLine("");
                }
                break;
            default:
                ShowLine("Commande non trouvée.", 2);
                break;
        }
    }
}

function ClearConsole() {
    const elements = document.getElementsByClassName("command");
    while (elements.length > 0) {
        elements[0].remove();
    }
}
function ShowLine(text, color) {
    const para = document.createElement("p");
    para.innerHTML = text;
    const element = document.getElementById("commandsContainer");
    para.classList.add("command");
    switch (color) {
        case 1:
            para.classList.add("green");
            break;
        case 2:
            para.classList.add("red");
            break;
        case 3:
            para.classList.add("yellow");
            break;
        case 4:
            para.classList.add("blue")
            break;
        case 100:
            para.classList.add("rainbow-text");
            break;
        default:
            break;
    }
    element.appendChild(para);
    element.scrollTop = element.scrollHeight;
}

ClearConsole();

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function LoadInitText() {
    const filesName = await ReadAndCutFile("Content/InitTexts/commandInitText.txt");
    const r = getRandomInt(filesName.length);
    const lines = await ReadAndCutFile("Content/InitTexts/" + filesName[r]);

    let color = 0; // 0 : no color, 1 : green, 2 : red, 3 : yellow, TODO : ADD MORE COLORS
    for (let index = 0; index < lines.length; index++) {
        if (lines[index].length >= 2) {
            if (lines[index][0] == '[' && lines[index][1] == '[') {
                switch (lines[index]) {
                    case "[[wait]]":
                        await wait(getRandomIntInRange(300, 1200));
                        break;
                    case "[[green]]":
                        color = 1;
                        break;
                    case "[[red]]":
                        color = 2;
                        break;
                    case "[[yellow]]":
                        color = 3;
                        break;
                    case "[[blue]]":
                        color = 4;
                        break;
                    case "[[rainbow]]":
                        color = 100;
                        break;
                    default:
                        break;
                }
                continue;
            }
        }
        ShowLine(lines[index], color);
        color = 0; // reset color 
    }

    finishLoading = true;
}


async function ShowCommandFile(file) {
    finishLoading = false;
    const response = await fetch(file);
    if (!response.ok) {
        ShowLine("Erreur lors du chargement de la commande.", 2);
        finishLoading = true;
        return;
    }
    const text = await response.text();let rawLines = text.split("\n");
    let lines = [];

    for (let i = 0; i < rawLines.length; i++) {
        let current = rawLines[i];
        while (current.trimEnd().endsWith("<br>") && i + 1 < rawLines.length) {
            current += rawLines[i + 1];
            i++;
        }
        lines.push(current);
    }
    let color = 0; // 0 : no color, 1 : green, 2 : red, 3 : yellow, TODO : ADD MORE COLORS
    for (let index = 0; index < lines.length; index++) {
        if (lines[index].length >= 2) {
            if (lines[index][0] == '[' && lines[index][1] == '[') {
                switch (lines[index]) {
                    case "[[wait]]":
                        await wait(getRandomIntInRange(300, 1200));
                        break;
                    case "[[green]]":
                        color = 1;
                        break;
                    case "[[red]]":
                        color = 2;
                        break;
                    case "[[yellow]]":
                        color = 3;
                        break;
                    case "[[blue]]":
                        color = 4;
                        break;
                    case "[[rainbow]]":
                        color = 100;
                        break;
                    default:
                        break;
                }
                continue;
            }
        }
        ShowLine(lines[index], color);
        color = 0; // reset color 
    }

    finishLoading = true;
}


function CompareArguments(arg1, arg2) {
    if (arg1.length - 4 != arg2.length) {
        return false;
    }

    for (let index = 0; index < arg2.length; index++) {
        if (arg1[index + 2] != arg2[index]) {
            return false;
        }

    }
    return true;
}


LoadFunctions();
LoadInitText();
// executeAfterWait();
