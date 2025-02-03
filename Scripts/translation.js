defaultLanguage = "en";

async function ChangeLanguage(lang) {
    console.log("Changing language to " + lang);

    const changes = await ReadAndCutFile("Content/contents.txt");

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
ChangeLanguage(defaultLanguage);