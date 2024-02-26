// Fonction pour afficher un point
function drawPoint(x, y) {
    const point = document.createElement('div');
    point.classList.add('point');
    point.style.left = x + 'px';
    point.style.top = y + 'px';
    document.getElementById('background').appendChild(point);
    // console.log(x,y);
    return point;
}

// Fonction pour relier deux points avec une ligne
function drawLine(point1, point2, x1, y1, x2, y2) {
    const line = document.createElement('div');
    line.classList.add('line');
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    line.style.width = length + 'px';
    line.style.transformOrigin = '0 0';
    line.style.transform = 'translate(' + x1 + 'px, ' + y1 + 'px) rotate(' + Math.atan2(dy, dx) + 'rad)';
    document.getElementById('background').appendChild(line);
}

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
const numPoints = 200;
const points = [];
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
    const lines = background.getElementsByClassName('point');
    while (lines.length > 0) {
        lines[0].parentNode.removeChild(lines[0]);
    }
}

// Fonction pour calculer la distance entre deux points
function calculateDistance(point1, point2) {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

const DISTANCE = 100;
function drawLines() {
    // Parcourir tous les paires de points
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const point1 = points[i];
            const point2 = points[j];
            const distance = calculateDistance(point1, point2);

            // Si la distance entre les points est inférieure à la distance souhaitée
            if (distance < DISTANCE) {
                // Dessiner une ligne entre les deux points
                drawLine(point1.element, point2.element, point1.x, point1.y, point2.x, point2.y);
            }
        }
    }
}

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
    clearLines();

    // Dessiner les lignes entre tous les points
    drawLines();

    requestAnimationFrame(update); // Lancer la prochaine frame d'animation
}

// Lancer la première frame d'animation
requestAnimationFrame(update);


