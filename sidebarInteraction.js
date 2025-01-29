let themeIndex = 1;
const bgColor = ["#131116", "#E6EDED"];
const textColor = ["#FFF", "#000"];
const pointColor = ["#3D3845", "#3e3c41"];
const lineColor = ["#1B182C", "#9b97a1"];
const mouseLineColor = ["#3D3845", "#1b1b1b"];
// Console :

const titleBar = ["#373b41", "#C1C2CC"]
const inputContainer = ["#373b41", "#C1C2CC"]
const inputField = ["#c5c8c6", "#323232"]
const command = ["#181818", "#8E8E96"]
const commandBackground = ["#1d1f21", "#A5A5AF"]
const borderColor = ["#373b41", "#C1C2CC"]
const fontColor = ["#c5c8c6", "#323232"]

// sidebar :
const sidebarColor = ["#333", "#BCBCBC"];

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

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sidebarMouseEnter() 
{
    await wait(250); //TODO : Si on enleve la souris plus rapidement que 250ms, le texte reste affiché
    lightBulbTEXT.style.display = 'grid';
    frenchTranslationText.style.display = 'grid';
    englishTranslationText.style.display = 'grid';

}

function sidebarMouseLeave() {
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
    changeLanguage("fr");
    ChangeLanguageSideBar("fr"); 
});


englishTranslation.addEventListener('click', function() {
    changeLanguage("en");    
    ChangeLanguageSideBar("en");
});


lightBulb.addEventListener('click', function() {
    switchColorMode();
});




//dark mode as default
switchColorMode();
sidebarMouseLeave();