// Variables de juego
let player;
let enemyBase;
let enemyPlatform;
let missiles = [];
let projectiles = [];
let isGameOver = false;
let playerLives = 3; // Número de vidas del jugador
let shieldActive = false;
let shieldTimer = 0;
let shieldCooldown = 0;
let enemyDefeated = false;
let gameWon = false; // Agregar estado de victoria

// Clases de objetos
class Player {
  constructor() {
    this.x = 50;
    this.y = height - 60;
    this.w = 40;
    this.h = 40;
    this.speedX = 5;
    this.speedY = 0;
    this.gravity = 1;
    this.isJumping = false;
    this.isCrouching = false;
  }

  display() {
    if (shieldActive) {
      fill(0, 255, 255, 100); // Color del escudo con transparencia
      ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w + 20, this.h + 20);
    }
    if (this.isCrouching) {
      fill(0, 0, 255); // Color del jugador agachado
      rect(this.x, this.y + this.h / 2, this.w, this.h / 2);
    } else {
      fill(0, 0, 255); // Color del jugador
      rect(this.x, this.y, this.w, this.h);
    }
  }

  move() {
    if (this.isJumping) {
      this.y += this.speedY;
      this.speedY += this.gravity;
      if (this.y >= height - 60) {
        this.y = height - 60;
        this.isJumping = false;
        this.speedY = 0;
      }
    }
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= this.speedX;
    }
    if (keyIsDown(RIGHT_ARROW) && (this.x < width / 3 * 2 - this.w || (enemyDefeated && this.x < width - this.w))) {
      this.x += this.speedX;
    }
  }

  jump() {
    if (!this.isJumping && !this.isCrouching) {
      this.isJumping = true;
      this.speedY = -15;
    }
  }

  crouch(state) {
    this.isCrouching = state;
  }
}

class Missile {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 10;
    this.speed = speed;
  }

  display() {
    fill(255, 0, 0); // Color del misil
    rect(this.x, this.y, this.w, this.h);
  }

  move() {
    this.x -= this.speed;
  }

  hits(player) {
    if (player.isCrouching) return false; // Evitar impacto si está agachado
    return (
      this.x < player.x + player.w &&
      this.x + this.w > player.x &&
      this.y < player.y + player.h &&
      this.y + this.h > player.y
    );
  }
}

class EnemyBase {
  constructor() {
    this.x = width - 100;
    this.y = height - 60;
    this.w = 80;
    this.h = 40;
    this.health = 3;
    this.movingForward = false;
    this.moveTimer = 0;
    this.returning = false;
    this.inBase = true;
    this.baseCooldown = 0;
  }

  display() {
    fill(255, 0, 255); // Color del enemigo
    rect(this.x, this.y, this.w, this.h);
  }

  move() {
    if (this.movingForward) {
      this.x -= 3; // Velocidad del enemigo
      if (this.x <= width / 3) {
        this.x = width / 3;
        this.movingForward = false;
        this.moveTimer = 180; // El enemigo se queda 3 segundos en los dos tercios de la pantalla
      }
    } else if (this.moveTimer > 0) {
      this.moveTimer--;
    } else if (this.returning) {
      this.x += 3; // Velocidad de regreso del enemigo
      if (this.x >= width - 100) {
        this.x = width - 100;
        this.returning = false;
        this.inBase = true;
        this.baseCooldown = 180; // El enemigo se queda 3 segundos en la base
      }
    } else if (this.baseCooldown > 0) {
      this.baseCooldown--;
    } else {
      this.movingForward = true;
      this.inBase = false;
    }
  }

  checkCollision(player) {
    return (
      this.x < player.x + player.w &&
      this.x + this.w > player.x &&
      this.y < player.y + player.h &&
      this.y + this.h > player.y
    );
  }

  isHit(projectile) {
    return (
      projectile.x > this.x &&
      projectile.y > this.y &&
      projectile.y < this.y + this.h
    );
  }
}

class EnemyPlatform {
  constructor() {
    this.x = width - 100;
    this.y = height - 20;
    this.w = 80;
    this.h = 20;
  }

  display() {
    fill(150);
    rect(this.x, this.y, this.w, this.h);
  }
}

class Projectile {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.w = 10;
    this.h = 10;
    this.speed = speed;
  }

  display() {
    fill(0, 255, 0); // Color de los proyectiles del jugador
    ellipse(this.x, this.y, this.w, this.h);
  }

  move() {
    this.x += this.speed;
  }
}

function setup() {
  createCanvas(640, 480);
  player = new Player();
  enemyBase = new EnemyBase();
  enemyPlatform = new EnemyPlatform();
}

function draw() {
  background(200);

  if (isGameOver) {
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);
    text("¡Fin del juego! Pulsa R para reiniciar", width / 2, height / 2);
    return;
  }

  if (gameWon) {
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);
    text("¡Has ganado! Pulsa R para reiniciar", width / 2, height / 2);
    return;
  }

  // Mostrar instrucciones
  textSize(16);
  fill(0);
  textAlign(LEFT, TOP);
  text("Usa las flechas IZQUIERDA y DERECHA para moverte.", 10, 10);
  text("Usa la flecha ARRIBA para saltar y la flecha ABAJO para agacharte.", 10, 30);
  text("Pulsa ESPACIO para disparar y E para destruir la base enemiga (cuando esté derrotada).", 10, 50);
  text("Vidas: " + playerLives, width - 100, 10);
  
  // Mostrar el escudo y su tiempo de cooldown
  if (shieldActive) {
    fill(0, 255, 255, 100); // Color del escudo con transparencia
    ellipse(player.x + player.w / 2, player.y + player.h / 2, player.w + 20, player.h + 20);
  }
  if (shieldCooldown > 0) {
    fill(0);
    textSize(16);
    text("Escudo disponible en: " + Math.ceil(shieldCooldown / 60), 10, 70);
  }

  // Dibujar suelo
  fill(100, 50, 0);
  rect(0, height - 20, width, 20);

  // Mostrar la plataforma del enemigo
  enemyPlatform.display();

  // Mostrar jugador y enemigo
  player.display();
  player.move();
  if (!enemyDefeated) {
    enemyBase.display();
    enemyBase.move();

    if (enemyBase.checkCollision(player)) {
      if (!shieldActive) {
        playerLives--;
        if (playerLives <= 0) {
          isGameOver = true;
        }
      }
    }

    // Manejamos los misiles
    if (frameCount % 60 === 0) {
      let missileY = random([height - 50, height - 80, height - 110]); // Altura aleatoria de los misiles
      let missile = new Missile(width, missileY, 5);
      missiles.push(missile);
    }

    missiles.forEach((missile, index) => {
      missile.move();
      missile.display();
      if (missile.hits(player)) {
        if (!shieldActive) {
          playerLives--;
          if (playerLives <= 0) {
            isGameOver = true;
          }
        }
        missiles.splice(index, 1);
      }
    });
  }

  // Proyectiles del jugador
  projectiles.forEach((projectile, index) => {
    projectile.move();
    projectile.display();

    // Verificar si un proyectil impacta la base enemiga
    if (enemyBase.isHit(projectile)) {
      enemyBase.health--;
      if (enemyBase.health <= 0) {
        enemyDefeated = true;
      }
      projectiles.splice(index, 1);
    }
  });

  // Verificar si el jugador puede destruir la base con la tecla "E"
  if (enemyDefeated && dist(player.x, player.y, enemyBase.x, enemyBase.y) < 50 && keyIsDown(69)) { // E = 69
    gameWon = true;
  }
}

// Función para reiniciar el juego
function keyPressed() {
  if (keyCode === 32 && !gameWon && !isGameOver) { // Tecla ESPACIO para disparar
    let projectile = new Projectile(player.x + player.w, player.y + player.h / 2, 7);
    projectiles.push(projectile);
  }
  if (keyCode === 82) { // Tecla R para reiniciar
    resetGame();
  }
  if (keyCode === DOWN_ARROW) {
    player.crouch(true);
  }
  if (keyCode === UP_ARROW) {
    player.jump();
  }
  if (keyCode === 83 && shieldCooldown <= 0) { // Tecla 'S' para activar el escudo
    shieldActive = true;
    shieldTimer = 180; // Duración del escudo (3 segundos)
    shieldCooldown = 300; // Cooldown (5 segundos)
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    player.crouch(false);
  }
}

// Reiniciar el juego
function resetGame() {
  player = new Player();
  enemyBase = new EnemyBase();
  enemyPlatform = new EnemyPlatform();
  missiles = [];
  projectiles = [];
  isGameOver = false;
  gameWon = false;
  playerLives = 3;
  enemyDefeated = false;
  shieldActive = false;
  shieldTimer = 0;
  shieldCooldown = 0;
}
