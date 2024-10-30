async function changeLanguage(lang) {
    //Load file containing all changeable elements

    const changeFile = await fetch("Content/contents.txt");
    const content = await changeFile.text();
    const changes = content.split("\r\n"); // To remove "retour chariot"
    
    const response = await fetch("Content/"+lang + '.json');
    const texts = await response.json();

    for (let i = 0; i < changes.length; i++) {
        const name = changes[i];
        try {
            document.getElementById(name).innerHTML = texts[name];
        } catch (error) {
            console.error("Couldn't find : " + name)
        }
    }
}

//Load default language
changeLanguage('fr');