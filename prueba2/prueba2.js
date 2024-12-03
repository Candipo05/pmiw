
let anchoPantalla = 640;
let altoPantalla = 480;
let imagenes = [];
let texto = [];
let cantidadImg = 23;
let pantallaActual = 0;
let lineaTexto = 0;
let boton,botonCreditos,botonReiniciar;
let decision = false;
let imagenIntro, imagenCreditos;

function setup() {
createCanvas(anchoPantalla,altoPantalla);
textFont("Mario-Party-Hudson-Font");
}


function draw() {
if (pantallaActual === 0) {
  image(imagenIntro,0,0,anchoPantalla,altoPantalla);
  } else if (pantallaActual === "creditos") {
    image(imagenCredito,0,0,anchoPantalla,altoPantalla);
    dibujarBotonReiniciar();
    if (!sound.isPlaying()) {
            sound.play();
        }
    } else {
    dibujarPantalla(pantallaActual);
  }
 }

function mousePressed() {
if (pantallaActual === 0) { 
    botonEmpezar();
  } 
  else if (pantallaActual === 15 || pantallaActual === 20 || pantallaActual === 23) {
    creditos(); 
  } 
  else if (pantallaActual === "creditos"){
    reiniciar();
    }
  else {
    opciones(); 
  }
  console.log(mouseX, mouseY);
}
