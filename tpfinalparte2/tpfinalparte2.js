//Candela Hermida 119054/7
//https://youtu.be/LbgaU_03Wpk

let imagenes = {};
let sonidos = {};
let pantallaActual;


function preload() {

  imagenes.fondo = loadImage("data/fondo.png");
  imagenes.inicio = loadImage("data/inicio.png");
  imagenes.creditos = loadImage("data/creditos.png");
  imagenes.finalVictoria = loadImage("data/finalvictoria.png");
  imagenes.finalDerrota = loadImage("data/fianderota.png");

  imagenes.usuario = loadImage("data/usuario.png");
  imagenes.usuarioDanio = loadImage("data/usuarioresivedano.png");
  imagenes.usuarioAgachado = loadImage("data/usuarioagachado.png");
  imagenes.usuarioSaltando = loadImage("data/usuariosaltando.png");

  imagenes.oponente = loadImage("data/oponente.png");
  imagenes.oponenteDanio = loadImage("data/oponenteresivedano.png");

  imagenes.ataqueUsuario = loadImage("data/ataqueusuario.png");
  imagenes.ataqueOponente = loadImage("data/ataqueoponente.png");


  soundFormats('mp3');
  sonidos.battle = loadSound("data/pokemon-battle.mp3");
}


function setup() {
  createCanvas(640,480);
  textFont("Verdana");
  pantallaActual = new PantallaInicio();
}

function draw() {
  if (pantallaActual) {
    pantallaActual.actualizar();
    pantallaActual.dibujar();
  }
}


function keyPressed() {
  if (pantallaActual && pantallaActual.keyPresionada) pantallaActual.keyPresionada(key);
}

function keyReleased() {
  if (pantallaActual && pantallaActual.keySoltada) pantallaActual.keySoltada(key);
}

function mousePressed() {
  if (pantallaActual && pantallaActual.mouseClick) pantallaActual.mouseClick();
}



class Button {
  constructor(x,y,w,h,label) {
    this.x=x; this.y=y;
    this.w=w; this.h=h;
    this.label=label;
  }

  dibujar() {
    push();
    noStroke(); fill(0,30);
    rect(this.x+3, this.y+4, this.w, this.h);

    stroke(0); strokeWeight(2);
    fill(255,220,110);
    rect(this.x,this.y,this.w,this.h);

    noStroke(); fill(0);
    textAlign(CENTER,CENTER);
    textSize(16);
    text(this.label, this.x+this.w/2, this.y+this.h/2 -1);
    pop();
  }

  contiene(px,py){
    return (px>=this.x && px<=this.x+this.w && py>=this.y && py<=this.y+this.h);
  }
}



function dibujarRecuadroInfo(x,y,lines,colorcito,pad=8){

  textSize(14);
  let tw=0;
  for (let t of lines) tw = max(tw, textWidth(t));
  let w=tw + pad*2;
  let h= (14 * lines.length) + pad*2;

  let m=10;
  if (x+w > width-m) x = width-w-m;
  if (x<m) x=m;
  if (y+h > height-m) y = height-h-m;
  if (y<m) y=m;

  push();
  stroke(0); strokeWeight(2); fill(colorcito);
  rect(x,y,w,h);
  noStroke(); fill(0); textAlign(LEFT,TOP);

  for (let i=0;i<lines.length;i++){
    text(lines[i], x+pad, y+pad + i*14);
  }
  pop();

  return {x,y,w,h};
}



class PantallaInicio {
  constructor(){
    this.startButton = new Button(width/2-90, height-120, 180,44, "Comenzar");
    this.creditsButton = new Button(width/2-90, height-64, 180,44, "Créditos");

    if (sonidos.battle && sonidos.battle.isPlaying()) sonidos.battle.stop();
  }

  actualizar(){}

  dibujar(){
    image(imagenes.fondo,0,0,width,height);
    image(imagenes.inicio,0,0,width,height);

    this.startButton.dibujar();
    this.creditsButton.dibujar();

    let lines=["W: saltar","S: agacharse","Click: atacar"];
    let pad=8;

    let tw=0;
    for (let l of lines) tw=max(tw,textWidth(l));
    let boxW = tw + pad*2;

    let boxX = this.startButton.x - 16 - boxW;
    let boxY = this.creditsButton.y + this.creditsButton.h + 8;

    dibujarRecuadroInfo(boxX, boxY, lines, color(255,220,110), pad);
  }

  mouseClick(){
    let mx=mouseX, my=mouseY;
    if (this.startButton.contiene(mx,my)) pantallaActual=new PantallaJuego();
    else if (this.creditsButton.contiene(mx,my)) pantallaActual=new PantallaCreditos();
  }

  keyPresionada(k){
    if (k===" ") pantallaActual=new PantallaJuego();
  }
}



class PantallaJuego {
  constructor(){
    this.juego=new Juego();

    if (sonidos.battle){
      sonidos.battle.setLoop(true);
      if (!sonidos.battle.isPlaying()){
        sonidos.battle.setVolume(0.8);
        sonidos.battle.play();
      }
    }
  }

  actualizar(){ this.juego.actualizar(); }
  dibujar(){ this.juego.dibujar(); }
  keyPresionada(k){ this.juego.keyPresionada(k); }
  keySoltada(k){ this.juego.keySoltada(k); }
  mouseClick(){ this.juego.mouseClick(); }
}



class PantallaFin {
  constructor(gano){
    this.gano=gano;
    this.replayButton = new Button(width/2-100, height-120, 200, 44, "Volver a jugar");
    this.creditsButton = new Button(width/2-100, height-64, 200, 44, "Créditos");

    if (sonidos.battle && sonidos.battle.isPlaying()) sonidos.battle.stop();
  }

  actualizar(){}

  dibujar(){
    image(imagenes.fondo,0,0,width,height);

    if (this.gano) image(imagenes.finalVictoria,0,0,width,height);
    else image(imagenes.finalDerrota,0,0,width,height);

    this.replayButton.dibujar();
    this.creditsButton.dibujar();

    let txt="Usá W para saltar, S para agacharte, click para atacar";
    let size=13; textSize(size);
    let pad=8;
    let w=textWidth(txt)+pad*2;
    let h=size+pad*2;
    let x=width/2 - w/2;
    let y=10;

    if (x<10) x=10;
    if (x+w>width-10) x=width-w-10;

    push();
    stroke(0); strokeWeight(2);
    fill(255,220,110);
    rect(x,y,w,h);
    noStroke(); fill(0); textAlign(CENTER,CENTER);
    text(txt, width/2, y+h/2);
    pop();
  }

  mouseClick(){
    let mx=mouseX,my=mouseY;
    if (this.replayButton.contiene(mx,my)) pantallaActual=new PantallaJuego();
    else if (this.creditsButton.contiene(mx,my)) pantallaActual=new PantallaCreditos();
  }
}



class PantallaCreditos {
  constructor(){
    this.backButton = new Button(width/2-90, height-80, 180,44, "Volver");

    if (sonidos.battle && sonidos.battle.isPlaying()) sonidos.battle.stop();
  }

  actualizar(){}

  dibujar(){
    image(imagenes.fondo,0,0,width,height);
    image(imagenes.creditos,0,0,width,height);

    let lines=[
      "Alumno: Candela Hermida",
      "Legajo: 119054/7",
      "Alumno: Luciano Kasalaba",
      "Legajo: 119059/2"
    ];

    dibujarRecuadroInfo(10,10,lines,color(255,220,110),8);
    this.backButton.dibujar();
  }

  mouseClick(){
    if (this.backButton.contiene(mouseX,mouseY)) pantallaActual=new PantallaInicio();
  }
}



class Juego {
  constructor(){
    this.baseline = height-40;

    this.jugador = new Jugador(40, this.baseline);
    this.oponente = new Oponente(width-200, this.baseline);

    this.ataquesJugador=[];
    this.ataquesOponente=[];

    this.golpesAlOponente=0;
    this.golpesAlJugador=0;
    this.contadorFrames=0;

    this.juegoTerminado=false;
  }

  actualizar(){
    if (this.juegoTerminado) return;

    this.contadorFrames++;
    this.jugador.actualizar();
    this.oponente.actualizar();

    if (this.contadorFrames % 90 === 0){
      this.ataquesOponente.push(new AtaqueOponente(this.oponente.x-10, this.oponente.y-this.oponente.alto/2));
    }

    for (let i=this.ataquesJugador.length-1;i>=0;i--){
      let a=this.ataquesJugador[i];
      a.actualizar();
      if (a.x>width+50) this.ataquesJugador.splice(i,1);
      else if (a.colisionaCon(this.oponente)){
        this.golpesAlOponente++;
        this.oponente.recibirGolpe();
        this.ataquesJugador.splice(i,1);

        if (this.golpesAlOponente>=3){ this.terminar(true); return; }
      }
    }

    for (let i=this.ataquesOponente.length-1;i>=0;i--){
      let a=this.ataquesOponente[i];
      a.actualizar();
      if (a.x<-50) this.ataquesOponente.splice(i,1);
      else if (a.colisionaCon(this.jugador) && !this.jugador.esquivando()){
        this.golpesAlJugador++;
        this.jugador.recibirGolpe();
        this.ataquesOponente.splice(i,1);
        this.terminar(false);
        return;
      }
    }
  }

  dibujar(){
    image(imagenes.fondo,0,0,width,height);

    this.jugador.dibujar();
    this.oponente.dibujar();

    for (let a of this.ataquesJugador) a.dibujar();
    for (let a of this.ataquesOponente) a.dibujar();

    let pad=8;
    dibujarRecuadroInfo(10,10,[
      "Golpes al oponente: "+this.golpesAlOponente+" / 3",
      "Golpes recibidos: "+this.golpesAlJugador+" / 1"
    ], color(255,220,110), pad);


    let i1="W: saltar   |   S: agacharse   |   Click: atacar";
    let i2="Click = reiniciar cuando termine";
    let tw=max(textWidth(i1), textWidth(i2));
    let w=tw+pad*2;
    let h=14*2+pad*2;
    let x=width-10-w;

    dibujarRecuadroInfo(x,8,[i1,i2],color(255,220,110),pad);
  }

  terminar(gano){
    this.juegoTerminado=true;
    pantallaActual = new PantallaFin(gano);
  }

  keyPresionada(k){ this.jugador.keyPresionada(k); }
  keySoltada(k){ this.jugador.keySoltada(k); }

  mouseClick(){
    if (!this.juegoTerminado){
      this.ataquesJugador.push(new AtaqueJugador(
        this.jugador.x + this.jugador.ancho*0.9,
        this.jugador.y - this.jugador.alto/2
      ));
    } else pantallaActual=new PantallaJuego();
  }
}



class Jugador {
  constructor(x,y){
    this.x=x; this.y=y;
    this.ancho=140; this.alto=140;

    this.velY=0;
    this.enSuelo=true;
    this.agachado=false;
    this.danioTimer=0;
    this.gravedad=1;
  }

  actualizar(){
    this.velY+=this.gravedad;
    this.y+=this.velY;

    let piso=height-40;
    if (this.y>piso){
      this.y=piso; this.velY=0; this.enSuelo=true;
    }

    if (this.danioTimer>0) this.danioTimer--;
  }

  dibujar(){
    let img = imagenes.usuario;
    if (this.danioTimer>0) img = imagenes.usuarioDanio;
    else if (!this.enSuelo) img = imagenes.usuarioSaltando;
    else if (this.agachado) img = imagenes.usuarioAgachado;

    image(img, this.x, this.y-this.alto, this.ancho, this.alto);
  }

  keyPresionada(k){
    if ((k==="w"||k==="W") && this.enSuelo){
      this.velY=-16; this.enSuelo=false;
    }
    if (k==="s"||k==="S") this.agachado=true;
  }

  keySoltada(k){
    if (k==="s"||k==="S") this.agachado=false;
  }

  recibirGolpe(){ this.danioTimer=30; }

  esquivando(){ return (!this.enSuelo || this.agachado); }

  caja(){
    return { x:this.x, y:this.y-this.alto+20, w:this.ancho, h:this.alto-20 };
  }
}



class Oponente {
  constructor(x,y){
    this.x=x; this.y=y;
    this.ancho=160; this.alto=160;
    this.danioTimer=0;
  }

  actualizar(){
    if (this.danioTimer>0) this.danioTimer--;
  }

  dibujar(){
    let img = this.danioTimer>0 ? imagenes.oponenteDanio : imagenes.oponente;
    image(img, this.x, this.y-this.alto, this.ancho, this.alto);
  }

  recibirGolpe(){ this.danioTimer=30; }

  caja(){
    return {x:this.x, y:this.y-this.alto+20, w:this.ancho, h:this.alto-20};
  }
}



class AtaqueJugador {
  constructor(x,y){
    this.x=x; this.y=y;
    this.vel=14;
    this.ancho=96; this.alto=48;
  }

  actualizar(){ this.x+=this.vel; }

  dibujar(){ image(imagenes.ataqueUsuario,this.x,this.y,this.ancho,this.alto); }

  colisionaCon(obj){
    let a={x:this.x,y:this.y,w:this.ancho,h:this.alto};
    let b=obj.caja();
    return (a.x < b.x+b.w && a.x+a.w > b.x && a.y < b.y+b.h && a.y+a.h > b.y);
  }
}


class AtaqueOponente {
  constructor(x,y){
    this.x=x; this.y=y;
    this.vel=-11;
    this.ancho=96; this.alto=48;
  }

  actualizar(){ this.x+=this.vel; }

  dibujar(){ image(imagenes.ataqueOponente,this.x,this.y,this.ancho,this.alto); }

  colisionaCon(obj){
    let a={x:this.x,y:this.y,w:this.ancho,h:this.alto};
    let b=obj.caja();
    return (a.x < b.x+b.w && a.x+a.w > b.x && a.y < b.y+b.h && a.y+a.h > b.y);
  }
}

