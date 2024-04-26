// Ensure that my mail is not directly in html file, to avoid scrapper bots.
try {
    mail = document.getElementById('mail');
    mail.innerText = "raphael.berquier@gmail.com"
    mail.href = "mailto:raphael.berquier@gmail.com"
} catch (error) {
    
}

const ratioPoint = 0.00004; // foreach pixel there is 0.00004 point, it's a small number, but too many points can lead to lag, especially on mobile device
const rationLine = 2; // Foreach point there is 2 lines created
const DISTANCE = 15000;
const MOUSELINENUMBER = 10;

let points = [];
let mouseLines = [];
let lines = [];

let mouseX;
let mouseY;

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

// First function called
function init(){
    // initialize variables
    points = [];
    mouseLines = [];
    lines = [];

    /*
    For optimization purposes, a fixed number of lines is pre-created before they are drawn. So each frame, lines are just moved to link points, and if there are too many, they are hidden.
    This can cause, if there are too many points to link, to not have enough lines. But this is practically unnoticeable and is worth it for performance (especially on mobile devices).
    */
    // Create all points
    let numPoints = parseInt(window.innerWidth * window.innerHeight * ratioPoint);
    for (let i = 0; i < numPoints; i++) {
        points.push(generatePoint());
    }

    // Create fixed number mouseLines (used to link mouse and points) 
    for (let index = 0; index < MOUSELINENUMBER; index++) {
        mouseLines.push(document.createElement('div'));
        mouseLines[index].classList.add('mouseLine');
        document.getElementById('background').appendChild(mouseLines[index]);
    }

    // Create line (links between points)  according to the ratioLine.
    let numLines = parseInt(numPoints * rationLine);
    for (let i = 0; i < numLines; i++) {
        lines.push(document.createElement('div'));
        lines[i].classList.add('line');
        document.getElementById('background').appendChild(lines[i]);
    }
}


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
    const ml = background.getElementsByClassName('mouseLine');
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

    for (let index = 0; index < mouseLines.length; index++) {
        mouseLines[index].style.display = 'none';;
    }
    let mouseId = 0;
    for (let i = 0; i < points.length; i++) {
        const point1 = points[i];
        for (let j = i + 1; j < points.length; j++) {
            const point2 = points[j];
            const distance = calculateDistance(point1, point2);

            // Si la distance entre les points est inférieure à la distance souhaitée
            if (distance < DISTANCE) {
                if (id > lines.length-1){
                    console.log("There ins't enough lines !");
                    return;
                }
                moveLine(lines[id], point1.x, point1.y, point2.x, point2.y);
                id+=1;
            }
        }
        const distance = calculateDistance({x: mouseX, y: mouseY}, point1);
        
        // Si la distance entre la souris et le point est inférieure à la distance souhaitée
        if (distance < DISTANCE) {
            moveLine(mouseLines[mouseId], mouseX, mouseY, point1.x, point1.y);
            mouseId+=1;
        }


    }
}

document.addEventListener('mousemove', function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

document.addEventListener('touchmove', function(event) {
    if(event.clientX != 0 && event.clientY != 0){
        mouseX = event.touches[0].clientX;
        mouseY = event.touches[0].clientY;
        // alert(mouseX.toString() + mouseY.toString());
    }
});


function movePoint(point) {
    // Add points velocity to the point position
    point.x += point.vx;
    point.y += point.vy;

    // Allow points to bounce of at the edge of the screen
    if (point.x < 0 || point.x > window.innerWidth) {
        point.vx *= -1;
    }
    if (point.y < 0 || point.y > window.innerHeight) {
        point.vy *= -1;
    }

    point.element.style.left = point.x + 'px';
    point.element.style.top = point.y + 'px';
}

// Called each frame
function update() {
    points.forEach(movePoint); // move all points present in the screen

    drawLines(); // Draw lines between points and mouse

    requestAnimationFrame(update); // Start the function "update" for the next frame
}


window.addEventListener('resize', function(event) { // On mobile device, sometimes when you scroll, the resolution change a little bit
    if (Math.abs(windowWidth-window.innerWidth) <= 100 && Math.abs(windowHeight-window.innerHeight) <= 100){
        return;
    }
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    // Clear all lines and points
    clearLines();
    clearPoints();

    // Restart the simulation
    init();
});


// Start the simulation
init();

// Called a first time the function "update", that will be called every frame.
requestAnimationFrame(update);


