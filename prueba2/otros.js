function dibujarBoton (){
  image(boton, 500, 340, 120, 40);
  }

function dibujarBotonReiniciar() {
  image(botonReiniciar,290,330,120,40);
  }

function creditos (){
  if(mouseX > 500 && mouseX < 620 && mouseY > 340 && mouseY < 380){
    pantallaActual = "creditos";
    dibujarBotonReiniciar();
    } 
  }
  
function dibujarBotonCreditos (){
  image(botonCreditos, 500, 340, 120, 40);
  }
  
function cuadroTexto() {
  fill(255,196,47);
  rect(anchoPantalla * 0.03,altoPantalla * 0.80,600,70);
  }
