let posX, posY;
let white = 255;
let black = 0;
let startWhite;
let img;

function setup() {
  createCanvas(800, 400);
  img = loadImage("op art.jpg");
  background(255);
  strokeWeight(10);
}

function draw() {
  image(img, 0, 0, width / 2, height);
  posY = 5;
  posX = 405;

  for (let j = 1; j <= 4; j++) {
    if (j % 2 !== 0) {
      firstRow();
      posX = 400;
    } else {
      secondRow();
      posX = 400;
    }
    posY += 100;
  }
}

function firstRow() {
  let tHeight = 85;
  let tWidth = 0;

  for (let i = 0; i < 2; i++) {
    topLeftTriangles(tHeight, tWidth);

    posY += 4;
    posX += 4;
    changeColor();
    bottomRightTriangles(tHeight, tWidth);

    posX += 100;
    posY -= 4;
    topRightTriangles(tHeight, tWidth);

    posX -= 4;
    posY += 4;
    changeColor();
    bottomLeftTriangles(tHeight, tWidth);

    posX += 100;
    posY -= 4;
  }
}

function secondRow() {
  let tHeight = 85;
  let tWidth = 0;

  for (let i = 0; i < 2; i++) {
    topRightTriangles(tHeight, tWidth);

    posX -= 4;
    posY += 4;
    changeColor();
    bottomLeftTriangles(tHeight, tWidth);

    posX += 100;
    posY -= 4;
    topLeftTriangles(tHeight, tWidth);

    posY += 4;
    posX += 4;
    changeColor();
    bottomRightTriangles(tHeight, tWidth);

    posX += 100;
    posY -= 4;
  }
}

function topLeftTriangles(tHeight, tWidth) {
  for (let i = 1; i < 9; i++) {
    setColor();
    triangle(posX + tHeight, posY + tWidth, posX + tWidth, posY + tWidth, posX + tWidth, posY + tHeight);
    tHeight -= 5;
    tWidth += 5;
    changeColor();
  }
}

function topRightTriangles(tHeight, tWidth) {
  for (let i = 1; i < 9; i++) {
    setColor();
    triangle(posX + tWidth, posY + tWidth, posX + tHeight, posY + tWidth, posX + tHeight, posY + tHeight);
    tHeight -= 5;
    tWidth += 5;
    changeColor();
  }
}

function bottomLeftTriangles(tHeight, tWidth) {
  for (let i = 1; i < 9; i++) {
    setColor();
    triangle(posX + tWidth, posY + tWidth, posX + tWidth, posY + tHeight, posX + tHeight, posY + tHeight);
    tHeight -= 5;
    tWidth += 5;
    changeColor();
  }
}

function bottomRightTriangles(tHeight, tWidth) {
  for (let i = 1; i < 9; i++) {
    setColor();
    triangle(posX + tHeight, posY + tWidth, posX + tHeight, posY + tHeight, posX + tWidth, posY + tHeight);
    tHeight -= 5;
    tWidth += 5;
    changeColor();
  }
}

function setColor() {
  if (startWhite) {
    stroke(white);
    fill(white);
  } else {
    stroke(black);
    fill(black);
  }
}

function mouseClicked() {
  strokeWeight(random(5, 30));
}

function changeColor() {
  startWhite = !startWhite;
}
