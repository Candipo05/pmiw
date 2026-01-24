//Candela Hermida Legajo: 119054/7
//https://youtu.be/2q3d_aksCjA

let anchoPantalla = 640;
let altoPantalla = 480;

let imagenes = [];
let imagenInicial;
let imagenCreditos;
let imagenFinal = [];

let boton, botonCreditos, botonReiniciar;

let textos = [];
let pantallaActual = 0;

let soundBulba;
let soundCharm;
let soundEnd;
let prevPantalla = null;

function preload() {
  for (let i = 1; i <= 12; i++) {
    imagenes[i] = loadImage("data/" + i + ".png");
  }

  imagenFinal[1] = loadImage("data/final1.png");
  imagenFinal[2] = loadImage("data/final2.png");
  imagenFinal[3] = loadImage("data/final3.png");

  imagenInicial = loadImage("data/inicial.png");
  imagenCreditos = loadImage("data/creditos.png");

  boton = loadImage("data/boton.png");
  botonCreditos = loadImage("data/botoncreditos.png");
  botonReiniciar = loadImage("data/botonreiniciar.png");

  soundBulba = loadSound("data/bulbasaur.mp3");
  soundCharm = loadSound("data/charmander.mp3");
  soundEnd = loadSound("data/end.mp3");

  textos[1] = "Aquí tienes a tus Pokémon iniciales. Elige con cuidado, tu decisión marcará tu camino.";
  textos[2] = "Has elegido a tu primer Pokémon. Con mucha emoción, sales al camino y comienza tu aventura como entrenador.";
  textos[3] = "¡Un entrenador aparece en tu camino! —Te reto a un combate Pokémon, ¡prepárate!";
  textos[4] = "Elegiste a tu Pokémon con decisión. Con él a tu lado, das el primer paso en una nueva aventura llena de desafíos.";
  textos[5] = "Un entrenador aparece en tu camino y te desafía: —¡Veamos de qué sos capaz con tu nuevo Pokémon!";
  textos[6] = "¡Tu Pokémon es perfecto para este combate! Lanzas tus ataques y lográs vencer con facilidad. El entrenador te felicita.";
  textos[7] = "Decidís aventurarte a un gimnasio Pokémon. ¿Qué camino tomarás para llegar? Toca un camino.";
  textos[8] = "Vas por el Camino B. El recorrido es más largo y complicado.";
  textos[9] = "Se te caen las Pokébolas. Tenés que detenerte a recogerlas, perdiendo tiempo valioso.";
  textos[10] = "Camino A: Elegís el camino más directo hacia el gimnasio. El recorrido es corto.";
  textos[11] = "¡Finalmente llegaste al gimnasio! El líder del gimnasio te espera en el campo de batalla…";
  textos[12] = "Tu Pokémon está listo. ¿Qué harás?";
}

function setup() {
  createCanvas(anchoPantalla, altoPantalla);
  textAlign(LEFT, TOP);
  textSize(16);
}

function draw() {
  if (pantallaActual !== prevPantalla) {
    if (pantallaActual === "creditos") {
      if (soundEnd && !soundEnd.isPlaying()) {
        soundEnd.loop();
      }
    }
    if (prevPantalla === "creditos") {
      if (soundEnd && soundEnd.isPlaying()) {
        soundEnd.stop();
      }
    }
    prevPantalla = pantallaActual;
  }

  background(200);

  if (pantallaActual === 0) {
    image(imagenInicial, 0, 0, anchoPantalla, altoPantalla);
    cuadroTexto();
    fill(0);
    text("¡Bienvenido/a a tu aventura Pokémon! ¿Estás listo/a para convertirte en un verdadero entrenador?", anchoPantalla * 0.05, altoPantalla * 0.84, anchoPantalla * 0.9);
   image(boton, 220, 430, 200, 45);
  } else if (pantallaActual === "creditos") {
    image(imagenCreditos, 0, 0, anchoPantalla, altoPantalla);
    cuadroTexto();
    fill(0);
    textSize(14);
    let creditText = "Alumno: Candela Hermida\nLegajo: 119054/7\nAlumno: Luciano Kasalaba\nLegajo: 119059/2";
    text(creditText, anchoPantalla * 0.05, altoPantalla * 0.82, anchoPantalla * 0.9);
    image(botonReiniciar, 290, 330, 120, 40);
    textSize(16);

  } else if (typeof pantallaActual === "string" && pantallaActual.startsWith("final")) {
    let num = int(pantallaActual.replace("final", ""));
    image(imagenFinal[num], 0, 0, anchoPantalla, altoPantalla);
    cuadroTexto();
    fill(0);
    if (num === 1) {
      text("Tu Pokémon no es del tipo indicado para vencer a tu contrincante…\nLuchaste con valentía, pero has perdido el combate. Fin de la aventura.", anchoPantalla * 0.05, altoPantalla * 0.84, anchoPantalla * 0.9);
    } else if (num === 2) {
      text("Atacas apresuradamente y tu estrategia no funciona…\nEl líder del gimnasio aprovecha tu error y tu Pokémon cae derrotado. Tu aventura termina aquí.", anchoPantalla * 0.05, altoPantalla * 0.84, anchoPantalla * 0.9);
    } else if (num === 3) {
      text("Pensaste bien tu estrategia y diste el golpe decisivo.\n¡Felicitaciones, ganaste y tu aventura continúa con gloria!", anchoPantalla * 0.05, altoPantalla * 0.84, anchoPantalla * 0.9);
    }
    image(botonReiniciar, 260, 330, 120, 40);
    image(botonCreditos, 500, 340, 120, 40);

  } else {
    let p = pantallaActual;
    if (imagenes[p]) image(imagenes[p], 0, 0, anchoPantalla, altoPantalla);
    cuadroTexto();
    fill(0);
    text(textos[p], anchoPantalla * 0.05, altoPantalla * 0.84, anchoPantalla * 0.9);
    dibujarControlesPorPantalla(p);
  }
}

function mousePressed() {
  if (pantallaActual === 0) {
    if (isNextButton(mouseX, mouseY)) pantallaActual = 1;
    return;
  }

  if (pantallaActual === "creditos") {
    if (mouseX > 290 && mouseX < 410 && mouseY > 330 && mouseY < 370) pantallaActual = 0;
    return;
  }

  if (typeof pantallaActual === "string" && pantallaActual.startsWith("final")) {
    if (mouseX > 260 && mouseX < 380 && mouseY > 330 && mouseY < 370) pantallaActual = 0;
    else if (mouseX > 500 && mouseX < 620 && mouseY > 340 && mouseY < 380) pantallaActual = "creditos";
    return;
  }

  manejarClicksPantalla(pantallaActual);
}

function manejarClicksPantalla(p) {
  let nx = isNextButton(mouseX, mouseY);

  if (p === 1) {
    if (mouseX < anchoPantalla * 0.35 && mouseY > 120 && mouseY < 300) {
      pantallaActual = 2;
      if (soundBulba) soundBulba.play();
    } else if (mouseX > anchoPantalla * 0.65 && mouseY > 120 && mouseY < 300) {
      pantallaActual = 4;
      if (soundCharm) soundCharm.play();
    }
    return;
  }

  if (p === 2 && nx) pantallaActual = 3;
  else if (p === 3 && nx) pantallaActual = "final1";
  else if (p === 4 && nx) pantallaActual = 5;
  else if (p === 5 && nx) pantallaActual = 6;
  else if (p === 6 && nx) pantallaActual = 7;
  else if (p === 7) {
    if (mouseX < anchoPantalla * 0.5 && mouseY > 140 && mouseY < 340) pantallaActual = 10;
    else if (mouseX > anchoPantalla * 0.5 && mouseY > 140 && mouseY < 340) pantallaActual = 8;
  } else if (p === 8 && nx) pantallaActual = 9;
  else if (p === 9 && nx) pantallaActual = 11;
  else if (p === 10 && nx) pantallaActual = 11;
  else if (p === 11 && nx) pantallaActual = 12;
  else if (p === 12 && mouseY > 180 && mouseY < 230) {
    if (mouseX > 60 && mouseX < 280) pantallaActual = "final2";
    else if (mouseX > 360 && mouseX < 560) pantallaActual = "final3";
  }
}

function dibujarControlesPorPantalla(p) {
  if (p === 1) {
    noStroke();
    fill(255, 255, 255, 120);
    rect(20, 120, 180, 180);
    rect(anchoPantalla - 200, 120, 180, 180);
    fill(0);
    text("Bulbasaur", 30, 310);
    textAlign(CENTER);
    text("Charmander", anchoPantalla - 110, 310);
    textAlign(LEFT);
  }

  if (p === 7) {
    noStroke();
    fill(255, 255, 255, 140);
    rect(40, 140, 240, 200);
    rect(360, 140, 240, 200);
    fill(0);
    text("Camino A", 100, 320);
    textAlign(CENTER);
    text("Camino B", 480, 320);
    textAlign(LEFT);
  }

  if (p === 12) {
    stroke(0);
    strokeWeight(2);
    fill(255, 196, 47);
    rect(60, 180, 220, 50, 10);
    rect(360, 180, 200, 50, 10);
    noStroke();
    fill(0);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("Atacar rápido", 170, 205);
    text("Analizar y atacar", 460, 205);
    textSize(16);
    textAlign(LEFT, TOP);
  }

  if (![1,7,8,9,12].includes(p)) {
    image(boton, 500, 340, 120, 40);
  }

  if ([8,9].includes(p)) {
    image(boton, 500, 340, 120, 40);
  }
}

function isNextButton(x, y) {
  return (x > 220 && x < 420 && y > 430 && y < 475) || (x > 500 && x < 620 && y > 340 && y < 380);
}



function cuadroTexto() {
  noStroke();
  fill(255, 196, 47);
  rect(anchoPantalla * 0.03, altoPantalla * 0.80, anchoPantalla * 0.94, altoPantalla * 0.17);
}

