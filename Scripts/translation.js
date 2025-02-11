defaultLanguage = "fr";

async function ChangeLanguage(lang) {
    console.log("Changing language to " + lang);

    const changes = await ReadAndCutFile("Content/contents.txt");

    const response = await fetch("Content/" + lang + '.json');
    const texts = await response.json();

    for (let i = 0; i < changes.length; i++) {
        const name = changes[i];
        try {
            document.getElementById(name).innerHTML = texts[name];
        } catch (error) {
            console.error("Couldn't find : " + name + "line : ", i)
        }
    }
}

//Load default language
ChangeLanguageSideBar(defaultLanguage);
ChangeLanguage(defaultLanguage);