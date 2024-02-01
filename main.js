const fieldsBox = document.querySelector('.fields');
const tab = [270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299];
const width = 30;

// Making a grid
for (let i = 0; i < width * width; i++) {
  var field = document.createElement('div');
  fieldsBox.appendChild(field);
  field.setAttribute("id", i);
}

const squares = Array.from(document.querySelectorAll('.fields div'));

function draw() {
  for (let i = 0; i < tab.length; i++) {
    squares[tab[i]].classList.add('color');
  }
}

// Starting positon for the character
let currentCharId = 500;
squares[currentCharId].classList.add('character');


// TELPORTATION SECTION
const teleport = [449, 14];

function teleportDraw() {
  for (let i = 0; i < teleport.length; i++) {
    squares[teleport[i]].classList.add('teleport')
  }
}

function teleport0() {
  squares[currentCharId].classList.remove('character');
  squares[currentCharId].removeAttribute('class');
  currentCharId = teleport[1] + 30; // plus 30 is needed for the character to appear under the teleportation block
  squares[currentCharId].classList.add('character');
}

function teleport1() {
  squares[currentCharId].classList.remove('character');
  squares[currentCharId].removeAttribute('class');
  currentCharId = teleport[0] - 1; // minus 1 is needed for the character to appear next the teleportation block on the left side
  squares[currentCharId].classList.add('character');
}


// SHOOTING SESION
// pozycja postaci, kierunek strzalu, nowa klasa dla strzalu, to ze strzal zmienia odpowiednio id w czasie
function shooting(direction, newId) {
  let bulletPosition = Number('');

  switch (direction) {
    case 'left':
      bulletPosition = Number(newId - 1);
      break;
    case 'right':
      bulletPosition = Number(newId + 1);
      break;
    case 'up':
      bulletPosition = Number(newId - 30);
      break;
    case 'down':
      bulletPosition = Number(newId + 30);
      break; 
  } 
  squares[bulletPosition].classList.remove('bullet')
  squares[bulletPosition].classList.add('bullet')

  setTimeout(() => {
    squares[bulletPosition].classList.remove('bullet')
  }, 1000)

}

let direction;

// CHARACTER MOVEMENT
function charMove(e) {
  let newId = currentCharId;

  switch (e.key) {
    case 'ArrowLeft':
      if (newId % width !==0) newId -= 1;
      //squares[newId].classList.add('left');
      direction = 'left';
      break;
    case 'ArrowRight':
      if (newId % width < width -1) newId += 1;
      direction = 'right';
      break;
    case 'ArrowUp':
      if (newId >= 30) newId -= 30;
      direction = 'up';
      break;
    case 'ArrowDown':
      if (newId < 870) newId += 30;
      direction = 'down';
      break;
    case ' ':
      shooting(direction, newId)
      break;
  }

  if (tab.includes(newId)) return;
  if (newId == teleport[0]) {
    teleport0()
    return;
  }
  if (newId == teleport[1]) {
    teleport1()
    return;
  }
  squares[currentCharId].classList.remove('character');
  squares[currentCharId].removeAttribute('class');
  currentCharId = newId;
  squares[currentCharId].classList.add('character');
}
document.addEventListener('keydown', charMove);

draw(); // Function to creat a red blocks
teleportDraw(); // Function to create teleportation blocks

