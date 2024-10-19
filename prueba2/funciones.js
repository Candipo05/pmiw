function preload() {
imagenCredito = loadImage("data/creditos.jpg");
imagenIntro = loadImage("data/titulo.jpg");
botonCreditos = loadImage("data/botoncreditos.png");
botonReiniciar = loadImage("data/botonreiniciar.png");
boton = loadImage("data/boton.png"); 
texto = loadStrings('data/texto.txt');
for(let m = 0; m < cantidadImg; m++) {
  imagenes[m] = loadImage("data/imagen" + (m + 1) + ".jpg");
  }
  sound = loadSound('data/mario1.mp3');
}

function botonEmpezar(){
  if (pantallaActual === 0) {
    if (mouseX > 220 && mouseX < 420 && mouseY > 410 && mouseY < 445) {
      pantallaActual = 1; 
    }
  }
}

function dibujarPantalla(pantalla){
image(imagenes[pantalla - 1], 0,0, anchoPantalla, altoPantalla);
cuadroTexto();
verificarPantalla();
fill(0);
text(texto[pantalla - 1], anchoPantalla * 0.04, altoPantalla * 0.81, anchoPantalla * 0.9);
textSize(14);
  }

function avanzar(opciones, pantallaOpcion1, pantallaOpcion2) {
  if (opciones) {
    if(pantallaActual === 3) {
    if (mouseX > 72 && mouseX < 221 && mouseY > 178 && mouseY < 231) {
      pantallaActual = pantallaOpcion1;
    } else if (mouseX > 431 && mouseX < 576 && mouseY > 175 && mouseY < 224) {
      pantallaActual = pantallaOpcion2;
      }
    }
   if(pantallaActual === 6) {
    if (mouseX > 92 && mouseX < 220 && mouseY > 215 && mouseY < 270) {
      pantallaActual = pantallaOpcion1;
    } else if (mouseX > 431 && mouseX < 576 && mouseY > 220 && mouseY < 270) {
      pantallaActual = pantallaOpcion2;
      }
    }
   if(pantallaActual === 7) {
    if (mouseX > 90 && mouseX < 230 && mouseY > 236 && mouseY < 287) {
      pantallaActual = pantallaOpcion1;
    } else if (mouseX > 413 && mouseX < 550 && mouseY > 235 && mouseY < 288) {
      pantallaActual = pantallaOpcion2;
      }
    }
   if(pantallaActual === 13) {
    if (mouseX > 114 && mouseX < 230 && mouseY > 140 && mouseY < 195) {
      pantallaActual = pantallaOpcion1;
    } else if (mouseX > 43 && mouseX < 130 && mouseY > 300 && mouseY < 340) {
      pantallaActual = pantallaOpcion2;
      }
    }
   if(pantallaActual === 17) {
    if (mouseX > 36 && mouseX < 140 && mouseY > 90 && mouseY < 143) {
      pantallaActual = pantallaOpcion1;
    } else if (mouseX > 195 && mouseX < 330 && mouseY > 68 && mouseY < 118) {
      pantallaActual = pantallaOpcion2;
      }
    }
  }
}

function verificarPantalla(){
  if (pantallaActual === 3 || pantallaActual === 6 || pantallaActual === 7 || pantallaActual === 13 || pantallaActual === 17) {
    decision = true; 
  } else {
    decision = false; 
    dibujarBoton(); 
  } 
  if (pantallaActual === 15 || pantallaActual === 20 || pantallaActual === 23){
    dibujarBotonCreditos();
    }
}

function opciones(){
  if (decision) {
    if (pantallaActual === 3) {
      avanzar(true, 7, 4); 
    }
    else if (pantallaActual === 7) {
      avanzar(true, 9, 8); 
    }
    else if (pantallaActual === 6) {
      avanzar(true, 10, 12); 
    }
    else if (pantallaActual === 13) {
      avanzar(true, 16, 14);
    }
    else if (pantallaActual === 17) {
      avanzar(true, 18, 21); 
    }
  } else {
    if (pantallaActual === 9) {
      pantallaActual = 5;
    } else {
    if (pantallaActual === 8) {
      pantallaActual = 6;
    } else {
    if (pantallaActual === 11) {
      pantallaActual = 13;
    } else if (pantallaActual === 15 || pantallaActual === 20 || pantallaActual === 23){
      return;
    } else if (mouseX > 500 && mouseX < 500 + 120 && mouseY > 340 && mouseY < 340 + 40) {
      pantallaActual++; 
        }
      }
    }
  }
}

function reiniciar() {
  if (mouseX > 260 && mouseX < 380 && mouseY > 330 && mouseY < 370) {
    pantallaActual = 1; 
  }
}
