defaultLanguage = "fr";
const userLang = navigator.language || navigator.languages[0]; 
console.log("Dected language : ", userLang);
if(userLang.toLowerCase() == "en" ||userLang.toLowerCase()=="en-en"){
    defaultLanguage = "en";
}else if(userLang.toLowerCase() == "us" ||userLang.toLowerCase()=="en-us"){
    defaultLanguage = "en";
}

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