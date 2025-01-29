let themeIndex = 1;
const bgColor = ["#131116", "#f1f1f1"];
const textColor = ["#FFF", "#000"];
const pointColor = ["#3D3845", "#3e3c41"];
const lineColor = ["#1B182C", "#9b97a1"];
const mouseLineColor = ["#3D3845", "#1b1b1b"];
// Console :

const titleBar = ["#373b41"]
const inputContainer = ["#373b41"]
const inputField = ["#c5c8c6"]
const command = ["#181818"]



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

console.log(englishTranslation);

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

    document.documentElement.style.setProperty('--point-color', pointColor[themeIndex]);
    document.documentElement.style.setProperty('--line-color', lineColor[themeIndex]);
    document.documentElement.style.setProperty('--mouse-line-color', mouseLineColor[themeIndex]);
    
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