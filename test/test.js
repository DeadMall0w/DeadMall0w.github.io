const numPoints = 100;
const points = [];
const DISTANCE = 20000;
let mouseLines = [];
let lines = [];

function init(){
    for (let index = 0; index < 10; index++) {
        mouseLines.push(document.createElement('div'));
        mouseLines[index].classList.add('mouseline');
        document.getElementById('background').appendChild(mouseLines[index]);
    }
    for (let i = 0; i < 100; i++) {
        lines.push(document.createElement('div'));
        lines[i].classList.add('line');
        document.getElementById('background').appendChild(lines[i]);
    }
}

// Fonction pour afficher un point
function drawPoint(x, y) {
    const point = document.createElement('div');
    point.classList.add('point');
    point.style.left = x + 'px';
    point.style.top = y + 'px';
    document.getElementById('background').appendChild(point);
    return point;
}

// Fonction pour relier deux points avec une ligne
// function drawLine(point1, point2, x1, y1, x2, y2) {
//     const line = document.createElement('div');
//     line.classList.add('line');
//     const dx = x2 - x1;
//     const dy = y2 - y1;
//     const length = Math.sqrt(dx * dx + dy * dy);
//     line.style.width = length + 'px';
//     line.style.transformOrigin = '0 0';
//     line.style.transform = 'translate(' + x1 + 'px, ' + y1 + 'px) rotate(' + Math.atan2(dy, dx) + 'rad)';
//     document.getElementById('background').appendChild(line);
// }

// Fonction pour générer un nouveau point
function generatePoint() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    return {
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 4, // Vitesse de déplacement aléatoire en x
        vy: (Math.random() - 0.5) * 4, // Vitesse de déplacement aléatoire en y
        element: drawPoint(x, y) // Élément DOM représentant le point
    };
}

// Création des points
for (let i = 0; i < numPoints; i++) {
    points.push(generatePoint());
}

// Fonction pour effacer les lignes entre les points
function clearLines() {
    const background = document.getElementById('background');
    const lines = background.getElementsByClassName('line');
    while (lines.length > 0) {
        lines[0].parentNode.removeChild(lines[0]);
    }
}

function clearPoints() {
    const background = document.getElementById('background');
    // const lines = background.getElementsByClassName('point');
    // while (lines.length > 0) {
    //     lines[0].parentNode.removeChild(lines[0]);
    // }
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
    lineElement.style.display = 'block';
    lineElement.style.width = length + 'px';
    lineElement.style.transformOrigin = '0 0';
    lineElement.style.transform = 'translate(' + x1 + 'px, ' + y1 + 'px) rotate(' + Math.atan2(dy, dx) + 'rad)';
}

function drawLines() {
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
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Dessiner les lignes entre la souris et les points les plus proches
    drawMouseLines(mouseX, mouseY);
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
    // point.element.style.transform = `translate(${point.x}px, ${point.y}px)`;
    // Appliquer la transformation pour déplacer le point
    point.element.style.left = point.x + 'px';
    point.element.style.top = point.y + 'px';
}

function update() {
    // clearPoints()
    points.forEach(movePoint); // Déplacer les points

    // Effacer les lignes précédentes
    // clearLines();

    // Dessiner les lignes entre tous les points
    drawLines();

    requestAnimationFrame(update); // Lancer la prochaine frame d'animation
}
init();
// Lancer la première frame d'animation
requestAnimationFrame(update);


