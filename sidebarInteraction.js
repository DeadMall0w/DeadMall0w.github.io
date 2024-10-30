let themeIndex = 1;
const bgColor = ["#131116", "#f1f1f1"];
const textColor = ["#FFF", "#000"];
const pointColor = ["#3D3845", "#3e3c41"];
const lineColor = ["#1B182C", "#9b97a1"];
const mouseLineColor = ["#3D3845", "#1b1b1b"];




const hoverElement = document.getElementById('sidebar');

// First element of sidebar
const lightBulb = document.getElementById('lightBulb');
const lightBulbIMG = document.getElementById('lightBulbIMG');
const lightBulbTEXT = document.getElementById('lightBulbTEXT');


function sidebarMouseEnter() {
    lightBulbTEXT.style.display = 'grid';
}

function sidebarMouseLeave() {
    lightBulbTEXT.style.display = 'none';
}

// Ajoutez les écouteurs d'événements
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



lightBulb.addEventListener('click', function() {
    switchColorMode();
});




//dark mode as default
switchColorMode(themeIndex);
sidebarMouseLeave();