const fieldsBox = document.querySelector('.fields');
const tab = [218, 219, 220, 198, 177, 156];
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


// CHARCTER MOVEMENT
function charMove(e) {
  let newId = currentCharId;
  
  switch (e.key) {
    case 'ArrowLeft':
      if (newId % width !==0) newId -= 1;
      break;
    case 'ArrowRight':
      if (newId % width < width -1) newId += 1;
      break;
    case 'ArrowUp':
      if (newId >= 30) newId -= 30;
      break;
    case 'ArrowDown':
      if (newId < 870) newId += 30;
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

