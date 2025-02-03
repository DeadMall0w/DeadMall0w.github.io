defaultLanguage = "en";

async function changeLanguage(lang) {
    //Load file containing all changeable elements
    console.log("Changing language...")

    const changeFile = await fetch("Content/contents.txt");
    const content = await changeFile.text();
    const changes = content.split("\n"); // To remove "retour chariot"
    
    const response = await fetch("Content/" + lang + '.json');
    const texts = await response.json();

    for (let i = 0; i < changes.length; i++) {
        const name = changes[i];
        try {
            document.getElementById(name).innerHTML = texts[name];
            //console.log("Changed : " + name);
        } catch (error) {
            console.error("Couldn't find : " + name)
        }
    }
}

//Load default language
ChangeLanguageSideBar(defaultLanguage);
changeLanguage(defaultLanguage);