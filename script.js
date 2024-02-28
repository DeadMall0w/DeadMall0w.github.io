// Ensure that my mail is not directly in html file, to avoid scrapper bots.
try {
    mail = document.getElementById('mail');
    mail.innerText = "raphael.berquier@gmail.com"
    mail.href = "mailto:raphael.berquier@gmail.com"
} catch (error) {
    
}

const ratioPoint = 0.00004; // foreach pixel there is 0.00004 point, it's a small number, but too many points can lead to lag, especially on smartphone
const rationLine = 2;

let points = [];
const DISTANCE = 15000;
let mouseLines = [];
let lines = [];

let mouseX;
let mouseY;

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

function init(){
    points = [];
    mouseLines = [];
    lines = [];
    let numPoints = parseInt(window.innerWidth * window.innerHeight * ratioPoint);
    for (let i = 0; i < numPoints; i++) {
        points.push(generatePoint());
    }

    for (let index = 0; index < 10; index++) {
        mouseLines.push(document.createElement('div'));
        mouseLines[index].classList.add('mouseline');
        document.getElementById('background').appendChild(mouseLines[index]);
    }
    let numLines = parseInt(numPoints * rationLine);
    for (let i = 0; i < numLines; i++) {
        lines.push(document.createElement('div'));
        lines[i].classList.add('line');
        document.getElementById('background').appendChild(lines[i]);
    }
}

// Fonction pour afficher un point
function drawPoint(x, y) {
    const point = document.createElement('div');
    point.classList.add('point');
    point.style.left = x-3 + 'px';
    point.style.top = y-3 + 'px';
    document.getElementById('background').appendChild(point);
    return point;
}

// Fonction pour générer un nouveau point
function generatePoint() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    return {
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 2, // Vitesse de déplacement aléatoire en x
        vy: (Math.random() - 0.5) * 2, // Vitesse de déplacement aléatoire en y
        element: drawPoint(x, y) // Élément DOM représentant le point
    };
}

function clearLines() {
    const background = document.getElementById('background');
    const l = background.getElementsByClassName('line');
    while (l.length > 0) {
        l[0].parentNode.removeChild(l[0]);
    }
    const ml = background.getElementsByClassName('mouseline');
    while (ml.length > 0) {
        ml[0].parentNode.removeChild(ml[0]);
    }
}

function clearPoints() {
    const background = document.getElementById('background');
    const p = background.getElementsByClassName('point');
    while (p.length > 0) {
        p[0].parentNode.removeChild(p[0]);
    }
}

// Fonction pour calculer la distance entre deux points
function calculateDistance(point1, point2) {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return dx * dx + dy * dy;
}
function moveLine(lineElement, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    // Mettre à jour la position et la longueur de la ligne
    try {
        lineElement.style.display = 'block';
        lineElement.style.width = length + 'px';
        lineElement.style.transformOrigin = '0 0';
        lineElement.style.transform = 'translate(' + x1 + 'px, ' + y1 + 'px) rotate(' + Math.atan2(dy, dx) + 'rad)';
      }
      catch(err) {
        console.log(err);
      }
    
}

function drawLines() {
    for (let index = 0; index < lines.length; index++) {
        lines[index].style.display = 'none';;
    }
    let id = 0;
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const point1 = points[i];
            const point2 = points[j];
            const distance = calculateDistance(point1, point2);

            // Si la distance entre les points est inférieure à la distance souhaitée
            if (distance < DISTANCE) {
                if (id > lines.length-1){
                    // alert("pas asses de trait !");
                    return;
                }
                moveLine(lines[id], point1.x, point1.y, point2.x, point2.y);
                id+=1;
            }
        }
    }
}

function drawMouseLines(mouseX, mouseY) {
    let id = 0;
    for (let index = 0; index < mouseLines.length; index++) {
        mouseLines[index].style.display = 'none';;
    }
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const distance = calculateDistance({x: mouseX, y: mouseY}, point);
        // console.log(point, {x: mouseX, y: mouseY});
        
        // Si la distance entre la souris et le point est inférieure à la distance souhaitée
        if (distance < DISTANCE) {
            moveLine(mouseLines[id], mouseX, mouseY, point.x, point.y);
            id+=1;
        }
    }
}

document.addEventListener('mousemove', function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

document.addEventListener('touchmove', function(event) {
    if(event.clientX != 0 && event.clientY != 0){
        mouseX = event.clientX;
        mouseY = event.clientY;
        alert(mouseX.toString() + mouseY.toString());
    }
});


// Fonction pour déplacer un point avec des mouvements fluides
function movePoint(point) {
    // Déplacer le point en tenant compte de ses vitesses de déplacement
    point.x += point.vx;
    point.y += point.vy;

    // Rebondir sur les bords de l'écran
    if (point.x < 0 || point.x > window.innerWidth) {
        point.vx *= -1;
    }
    if (point.y < 0 || point.y > window.innerHeight) {
        point.vy *= -1;
    }

    point.element.style.left = point.x + 'px';
    point.element.style.top = point.y + 'px';
}

function update() {
    // clearPoints()
    points.forEach(movePoint); // Déplacer les points

    // Dessiner les lignes entre tous les points
    drawLines();

    drawMouseLines(mouseX, mouseY);

    requestAnimationFrame(update); // Lancer la prochaine frame d'animation
}


window.addEventListener('resize', function(event) { // On mobile device, sometimes when you scroll, the resolution change a little bit
    if (Math.abs(windowWidth-window.innerWidth) <= 100 && Math.abs(windowHeight-window.innerHeight) <= 100){
        return;
    }
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    clearLines();
    clearPoints();
    init();
});

init();
// Lancer la première frame d'animation
requestAnimationFrame(update);


