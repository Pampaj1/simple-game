const fieldsBox = document.querySelector('.fields');
const tab = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 60, 90, 120, 150, 180, 210, 240, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 330, 360, 390, 420, 450, 480, 510, 540, 570, 600, 630, 660, 690, 720, 750, 780, 810, 840, 870, 59, 89, 119, 149, 179, 209, 239, 269, 329, 359, 389, 419, 479, 509, 539, 569, 599, 629, 659, 689, 719, 749, 779, 809, 839, 869, 899, 871, 872, 873, 874, 875, 876, 877, 878, 879, 880, 881, 882, 883, 884, 885, 886, 887, 888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898];
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
let currentCharId = 705;
squares[currentCharId].classList.add('character');


// Sign
let signId = 825;
let collisionId = [794, 795, 796, 824, 854, 855, 826, 856]
squares[signId].classList.add('sign')
const sign = document.querySelector('div.sign')




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
  const bullet = document.querySelector('.bullet')
  
  switch (direction) {
    case 'left':
      bulletId -= 1;
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
  // create bullet which change position in selected direction
  squares[bulletId].classList.add('bullet')
  const bulletmove = setInterval(() => {
    squares[bulletId].classList.remove('bullet')
    // if the bullet collides with any object it disappears
    if (tab.includes(bulletId) 
    || teleport.includes(bulletId) 
    || currentCharId == bulletId 
    || signId == bulletId) {
      return;
    }
    
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
  }, 50)
  // removing bullet after 1s
  setTimeout(() => {
    clearInterval(bulletmove);
    squares[bulletId].classList.remove('bullet')
  }, 1000)
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

  if (tab.includes(newId) || newId == signId) return;
  if (newId == teleport[0]) {
    teleport0()
    return;
  }
  if (newId == teleport[1]) {
    teleport1()
    return;
  }

  sign.classList.remove('show')

  collisionId.map(element => {
    if (newId === element) {
      sign.classList.add('show')
      return;
    }
  })
  
  squares[currentCharId].classList.remove('character');
  squares[currentCharId].removeAttribute('class');
  currentCharId = newId;
  squares[currentCharId].classList.add('character');
}
document.addEventListener('keydown', charMove);

draw(); // Function to creat a red blocks
teleportDraw(); // Function to create teleportation blocks