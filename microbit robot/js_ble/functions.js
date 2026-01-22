var servo0_state = 0;
var servo1_state = 0;
var servo2_state = 0;

var speed = "100";

var up_state = false;
var down_state = false;
var left_state = false;
var right_state = false;
var z_state = false;
var x_state = false;
var space_state = false;
var noButton = true;

function send_reset() {
  servo0_state = 0;
  servo1_state = 0;
  servo2_state = 0;
}

function setMotor(_motor, direction, _power) {}

function setOutput(_output, _power) {}

function setServo(output, position) {}

function valBetween(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function allStop() {
  var data = new Uint8Array(2);
  data[0] = 213;
  data[1] = 99;
  sendData(data);
  send_reset();
}

function buttonPressed(button) {
  sendUART(button);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyUpHandler(event) {
  var keyPressed = String.fromCharCode(event.keyCode);

  if (keyPressed == "&" || event.key === "ArrowUp") {
    up_state = false;
    sendUART("stop");
  }
  if (keyPressed == "(" || event.key === "ArrowDown") {
    down_state = false;
    sendUART("stop");
  }
  if (keyPressed == "%" || event.key === "ArrowLeft") {
    left_state = false;
    sendUART("stop");
  }
  if (keyPressed == "'" || event.key === "ArrowRight") {
    right_state = false;
    sendUART("stop");
  }
  if (keyPressed == " ") {
    space_state = false;
    sendUART("stop");
  }
  if (keyPressed == "Z") {
    z_state = false;
  }
  if (keyPressed == "X") {
    x_state = false;
  }
}

function keyDownHandler(event) {
  var keyPressed = String.fromCharCode(event.keyCode);
  console.log(event.key);

  // Movement controls
  if (keyPressed == "&" || event.key === "ArrowUp") {
    sendUART("up");
    up_state = true;
  }
  if (keyPressed == "(" || event.key === "ArrowDown") {
    down_state = true;
    sendUART("down");
  }
  if (keyPressed == "%" || event.key === "ArrowLeft") {
    left_state = true;
    sendUART("left");
  }
  if (keyPressed == "'" || event.key === "ArrowRight") {
    right_state = true;
    sendUART("right");
  }
  if (keyPressed == " ") {
    space_state = true;
  }

  // Catapult controls (W = up, S = down)
  if (event.key === "w" || event.key === "W") {
    sendUART("catapult_up");
  }
  if (event.key === "s" || event.key === "S") {
    sendUART("catapult_down");
  }

  // LED flash (L key)
  if (event.key === "l" || event.key === "L") {
    sendUART("led_flash");
  }

  // Horn sound (H key)
  if (event.key === "h" || event.key === "H") {
    sendUART("horn_sound");
  }

  // Legacy Z and X controls
  if (keyPressed == "Z") {
    z_state = true;
    sendUART("z");
  }
  if (keyPressed == "X") {
    x_state = true;
    sendUART("x");
  }
}