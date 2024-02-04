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
let direction = 'right'; // variable needed to check the shoot direction 

function shooting(direction, newId) {

  let bulletId = newId;
  let bulletDire = '';
 
  switch (direction) {
    case 'left':
      if (bulletId % width !==0) bulletId -= 1;
      bulletDire = 'x';
      break;
    case 'right':
      bulletId += 1;
      bulletDire = 'y';
      break;
    case 'up':
      bulletId -= 30;
      bulletDire = 'z';
      break;
    case 'down':
      bulletId += 30;
      bulletDire = 'c';
      break; 
  }

  
  

  const startTime = new Date().getTime();
  const bulletmove = setInterval(() => {

    if (tab.includes(bulletId) || teleport.includes(bulletId))  {
      squares[bulletId].classList.remove('bullet')
      return;
    }

    squares[bulletId].classList.remove('bullet')
    squares[bulletId].removeAttribute('class')
    if (bulletDire == 'x') {
      bulletId -= 1;
    } else if (bulletDire == 'y') {
      bulletId += 1;
    } else if (bulletDire == 'z') {
      bulletId -= 30;
    } else {
      bulletId += 30;
    }
    squares[bulletId].classList.add('bullet')
    
    const currentTime = new Date().getTime();
    const endTime = startTime + 1000;

    if (currentTime >= endTime) {
      clearInterval(bulletmove);
      squares[bulletId].classList.remove('bullet')
      squares[bulletId].removeAttribute('class')
    }
  }, 50)
}



// CHARACTER MOVEMENT
function charMove(e) {
  let newId = currentCharId;

  switch (e.key) {
    case 'ArrowLeft':
      if (newId % width !== 0) newId -= 1;
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

