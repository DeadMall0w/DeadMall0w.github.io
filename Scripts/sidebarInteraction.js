let themeIndex = 1;
const bgColor = ["#131116", "#FFFFFF"];
const textColor = ["#FFF", "#252b35"];
const pointColor = ["#3D3845", "#c8c2d1"];
const lineColor = ["#1B182C", "#e1d8ec"];
const mouseLineColor = ["#3D3845", "#8b7e8b"];
// Console :

const titleBar = ["#373b41", "#373b41"]
const inputContainer = ["#373b41", "#373b41"]
const inputField = ["#c5c8c6", "#c5c8c6"]
const command = ["#181818", "#181818"]
const commandBackground = ["#1d1f21", "#1d1f21"]
const borderColor = ["#373b41", "#373b41"]
const fontColor = ["#c5c8c6", "#c5c8c6"]

// sidebar :
const sidebarColor = ["#333", "#cac6c6"];

// Couleurs projets
const projectsBackground = ['#00000049', "#9fbada2c"];
const projectBackground = ["#00000063", "#cad4e44f"];

const hoverElement = document.getElementById('sidebar');

// First element of sidebar
const lightBulb = document.getElementById('lightBulb');
const lightBulbIMG = document.getElementById('lightBulbIMG');
const lightBulbTEXT = document.getElementById('lightBulbTEXT');

// French translation
const frenchTranslationImage = document.getElementById('french-translation-image');
const frenchTranslation = document.getElementById('french-translation');
const frenchTranslationText = document.getElementById('french-translation-text');


// English translation
const englishTranslationImage = document.getElementById('english-translation-image');
const englishTranslation = document.getElementById('english-translation');
const englishTranslationText = document.getElementById('english-translation-text');

let willShow = false;

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sidebarMouseEnter() 
{
    willShow = true;
    await wait(250); //TODO : Si on enleve la souris plus rapidement que 250ms, le texte reste affiché
    if (willShow)
    {
        lightBulbTEXT.style.display = 'grid';
        frenchTranslationText.style.display = 'grid';
        englishTranslationText.style.display = 'grid';
    }

}

function sidebarMouseLeave() {
    willShow=false;
    frenchTranslationText.style.display = 'none';
    lightBulbTEXT.style.display = 'none';
    englishTranslationText.style.display = 'none';
}

hoverElement.addEventListener('mouseenter', sidebarMouseEnter);
hoverElement.addEventListener('mouseleave', sidebarMouseLeave);


function switchColorMode() {
    if (themeIndex == 0) {
        themeIndex = 1;
        lightBulbIMG.src = "img/light_bulb_on.png";
        lightBulbTEXT.innerText = 'Light mode';
    } else {
        themeIndex = 0;
        lightBulbIMG.src = "img/light_bulb_off.png";
        lightBulbTEXT.innerText = 'Dark mode';
    }
    document.documentElement.style.setProperty('--bg-color', bgColor[themeIndex]);
    document.documentElement.style.setProperty('--text-color', textColor[themeIndex]);

    // animated bg
    document.documentElement.style.setProperty('--point-color', pointColor[themeIndex]);
    document.documentElement.style.setProperty('--line-color', lineColor[themeIndex]);
    document.documentElement.style.setProperty('--mouse-line-color', mouseLineColor[themeIndex]);
   
    // console
    document.documentElement.style.setProperty('--title-bar', titleBar[themeIndex]);
    document.documentElement.style.setProperty('--input-container', inputContainer[themeIndex]);
    document.documentElement.style.setProperty('--input-field', inputField[themeIndex]);
    document.documentElement.style.setProperty('--command', command[themeIndex]);
    document.documentElement.style.setProperty('--command-background', commandBackground[themeIndex]);
    document.documentElement.style.setProperty('--border-color', borderColor[themeIndex]);
    document.documentElement.style.setProperty('--font-color-terminal', fontColor[themeIndex]);
    
    //sidebar
    document.documentElement.style.setProperty('--sidebar-color', sidebarColor[themeIndex]);

    document.documentElement.style.setProperty('--projects-background', projectsBackground[themeIndex]);
    document.documentElement.style.setProperty('--project-background', projectBackground[themeIndex]);

}

function ChangeLanguageSideBar(language)
{
    if(language == "fr")
    {
        frenchTranslationImage.src = "img/french_flag_on.png";
        englishTranslationImage.src = "img/english_flag.png";
    }else if(language == "en")
    {
        frenchTranslationImage.src = "img/french_flag.png";
        englishTranslationImage.src = "img/english_flag_on.png"; 
    }
}



frenchTranslation.addEventListener('click', function() {
    ChangeLanguage("fr");
    ChangeLanguageSideBar("fr"); 
});


englishTranslation.addEventListener('click', function() {
    ChangeLanguage("en");    
    ChangeLanguageSideBar("en");
});


lightBulb.addEventListener('click', function() {
    switchColorMode();
});




//dark mode as default
switchColorMode();
sidebarMouseLeave();