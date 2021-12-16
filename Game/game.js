// Se crea el área del juego
const context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 400;
context.canvas.width = 1220;

// Se inicializa el contador del frame en 1, dónde es el 1er nivel.
let frameCount = 1;

// ObCount es el número de obstáculos, cada nivel se añade otro.
let obCount = frameCount;

// Se crea un array dónde guardar las coordenadas del eje X de los obstáculos
const obXCoors = [];

// Se crea el cuadrado, con tamaños fijos y variables para su posición, velocidad y determinar si salta o no.
const square = {
  height: 32,
  jumping: true,
  width: 32,
  x: 0,
  xVelocity: 0,
  y: 0,
  yVelocity: 0,
};

// Se crea el obstáculo para cada frame/nivel.
const nextFrame = () => {
  // Este contador incrementa el núm. de obstáculos de cada nivel.
  frameCount++;

  for (let i = 0; i < obCount; i++) {
    // Genera coordenadas X aleatoramente para los óbstaculos.
    obXCoor = Math.floor(Math.random() * (1165 - 140 + 1) + 140);
    obXCoors.push(obXCoor);
  }
};

// Se crean los controles para las teclas arriba, izquierda y derecha. Se verifica si han sido pulsadas con el código de cada tecla mediante keyListener.
const controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function (event) {
    var key_state = event.type == "keydown" ? true : false;

    switch (event.keyCode) {
      case 37: // Tecla izquierda
        controller.left = key_state;
        break;
      case 38: // Tecla arriba
        controller.up = key_state;
        break;
      case 39: // Tecla derecha
        controller.right = key_state;
        break;
    }
  },
};

// Se crea el game loop, dónde va a comprobar lo que está haciendo el jugador con los controles y animará el movimiento del cuadrado. Se aplicará una sensación de gravedad y fricción. Manejará que ocurre cuando el jugador intenta salirse del frame y generará los siguientes frames de juego.
const loop = function () {
  if (controller.up && square.jumping == false) {
    square.yVelocity -= 20;
    square.jumping = true;
  }

  if (controller.left) {
    square.xVelocity -= 0.5;
  }

  if (controller.right) {
    square.xVelocity += 0.5;
  }

  square.yVelocity += 1.5; // Gravedad
  square.x += square.xVelocity;
  square.y += square.yVelocity;
  square.xVelocity *= 0.9; // Fricción eje x
  square.yVelocity *= 0.9; // Fricción eje y

  // Tras saltar, el cuadrado está en el suelo y no lo atraviesa.
  if (square.y > 386 - 16 - 32) {
    square.jumping = false;
    square.y = 386 - 16 - 32;
    square.yVelocity = 0;
  }

  // Si el cuadrado se va hacia el límite la izquierda, aparece en el límite derecho, dando sensación de scroll infinito.
  if (square.x < -20) {
    square.x = 1220;
  } else if (square.x > 1220) {
    // Si el cuadrado alcanza el límite de la derecha, se pinta el siguiente frame y se añade otro nivel de dificultad.
    square.x = -20;
    nextFrame();
  }

  // Crea el fondo de cada frame.
  context.fillStyle = "#201A23"; // Color de fondo
  context.fillRect(0, 0, 1220, 400); // Colorea el rectángulo.

  // Crea y colorea el cuadrado cada frame.
  context.fillStyle = "#8DAA9D"; // Color del cuadrado.
  context.beginPath();
  context.rect(square.x, square.y, square.width, square.height);
  context.fill();

  // Se crean los obstáculos para cada frame.
  // Se determina una altura para todos los obstáculos.
  const height = 200 * Math.cos(Math.PI / 6);

  context.fillStyle = "#FBF5F3"; // Color de los obstáculos.
  obXCoors.forEach((obXCoor) => {
    context.beginPath(); // Se avisa que se quiere dibujar con beginPath.

    // Se generan obstáculos a partir de las coordenadas aleatorias guardadas en el array obxCoor.
    context.moveTo(obXCoor, 385); // Con moveTo, se determinan las coordenadas inciales. Es es el 1er punto para dibujar la base del triángulo.
    context.lineTo(obXCoor + 20, 385); // Con lineTo se determina a que coordenada dibujar la línea del triángulo, cada coordenada X tiene un offset de 20 y 10 para generar triángulos equilateros.
    context.lineTo(obXCoor + 10, 510 - height); // La punta del tríangulo se dibuja al restarle la altura antes determinada y conectando con el lineTo anterior.

    context.closePath();
    context.fill();
  });

  // Se crea el suelo para cada frame
  context.strokeStyle = "#2E2532";
  context.lineWidth = 30;
  context.beginPath();
  context.moveTo(0, 385);
  context.lineTo(1220, 385);
  context.stroke();

  // Llama al método requestAnimatiomFrame para actualizar cuando el navegador esté listo para dibujar el frame otra vez.
  window.requestAnimationFrame(loop);
};

// Se actualiza el EventListener para el keyListener y se inicia el loop con la llamada al método requestAnimationFrame, que determina la función loop como respaldo.
window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
