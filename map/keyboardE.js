// [IMPORTS]
const map1 = await import("/map/map1.js");

// [VARIABLES]

var [wPressed, aPressed, sPressed, dPressed] = [0, 0, 0, 0];
var [pressedDebounceZ, pressedDebounceX, pressedDebounceY] = [false, false, false];
var listOfKeys = {
  'w': false,
  'a': false,
  's': false,
  'd': false
};

var mouseIsDown = false;

//WEAPON EQUIP VARIABLES
var fists = false
var pistol = true
var shotgun = false
var chaingun = false
var launcher = false
var plasmaGun = false
var bfg = false

//WEAPON OWNED VARIABLES
var shotgunOwned = false
var chaingunOwned = false
var launcherOwned = false
var plasmaGunOwned = false
var bfgOwned = false

//WEAPON MISC. VARIABLES


var moveSpeed = 1; //percentage of the walkSpeed.

var nearestPartMagnitude; //used in getNearestPart.

// [HELPER FUNCTIONS]
var weaponDebounce2 = false;

function weaponDebounce(rpm){
  weaponDebounce2 = true;
  setTimeout(function(){
    weaponDebounce2 = false;
  }, 60000/rpm)
}

function randomInt(min, max){
  return Math.floor(Math.random() * (max-min+1))  + min;
}

function updateLabel(label, value) {  
  if (typeof label == 'string') {
    label = document.querySelector(`#${label}`);
  }

  if (label == document.querySelector('#rot')) { //special exception to the rest of the function, hence the return statement
    label.innerText = `Camera rot.:(${parseFloat(((value.x*180/Math.PI)%360).toFixed(2))}, ${parseFloat(((value.y * 180/Math.PI)%360).toFixed(2))}, ${parseFloat(((value.z*180/Math.PI)%360).toFixed(2))})`;
    /*
    Breakdown:
      For each axis in the camera rotation position (Vector3, so 3 axes)...
        - It gets converted to degrees from radians (via multiplying the axis value by 180/PI).
        - It gets rounded to 2 decimal places (this makes the number a string unfortunately).
        - parseFloat changes the string back into a number.
    */
    return;
  }

  if (value instanceof BABYLON.Vector3) {
    value = `(${parseFloat(value.x.toFixed(2))}, ${parseFloat(value.y.toFixed(2))}, ${parseFloat(value.z.toFixed(2))})`;
  }

  if (label == document.querySelector('#pos')) {
    label.innerText = 'Camera position: ';
  } else {
    label.innerText = '';
  }

  label.innerText += value;
}


function getNearestPart(position){
  nearestPartMagnitude = 10**10**10**10**10;
  var nearestPart;

  for (var [key, value] of Object.entries(map1.mapPartsReal)) {
    if (value.id == 'player') {
      continue; //skip to the next cycle
    }

    if ("position" in value) {
      if (position.subtract(value.position).length() < nearestPartMagnitude) {
        nearestPart = value;
        nearestPartMagnitude = position.subtract(value.position).length();
      }
    }
  }

  return {part: nearestPart, magnitude: nearestPartMagnitude};
  
}

export function jump(scene){ //look, i jsut wanted to make a quadratic function thats it!!!
  var jumpFunction = (x) => (-1.2/9) * (x - 3) ** 2 + 0.6;

  var elapsedTime = 0;
  var animation = setInterval(function(){
    elapsedTime += 1;
    scene.gravity.y = jumpFunction(elapsedTime * 0.075);

    if (elapsedTime >= 6001) {
      clearInterval(animation);
      setTimeout(function(){
        pressedDebounceY = false;
      }, 135);
      return;
    }
  }, 1)
}

export function createProjectile(){ //jus testing
  try {

  } catch (err) {

  }
}

// [PROGRAM]

export function main(){
  const camera = map1.mapParts.camera;
  const character = map1.mapPartsReal.playerCharacter;
  const scene = map1.mapParts.scene;

  setInterval(updateLabel, 1, 'rot', camera.rotation);
  setInterval(updateLabel, 1, 'pos', camera.position);

  window.addEventListener("keyup", function(e){
    if (listOfKeys.hasOwnProperty(e.key)) {
      listOfKeys[e.key] = false;
    };
  })

  scene.gravity = new BABYLON.Vector3(0, -0.6, 0);

  camera.keysUp = [87];
  camera.keysDown = [83];
  camera.keysLeft = [65];
  camera.keysRight = [68]; //not the plan, will change later

  camera.needMoveForGravity = true;

  function allFalse(){
    fists = false
    pistol = false
    shotgun = false
    chaingun = false
    launcher = false
    plasmaGun = false
    bfg = false
  }

  window.addEventListener("keydown", function(e){
    if (e.code == 'Space' && !pressedDebounceY) {
      console.log('space pressed.');
      pressedDebounceY = true;
      //jump(scene);
    }
  
    //[I NEED MORE BOOLETS]
    if(e.key == '1'){
      allFalse();
      fists = true
    }

    if(e.key == '2'){
      allFalse();
      pistol = true
    }

    if(e.key == '3'){
      allFalse();
      shotgun = true
    }

    if(e.key == '4'){
      allFalse();
      chaingun = true
    }

    if(e.key == '5'){
      allFalse();
      launcher = true
    }

    if(e.key == '6'){
      allFalse();
      plasmaGun = true
    }

    if(e.key == '7'){
      allFalse();
      bfg = true
    }

    if(e.key=='q') {
      scene.debugLayer.show();
    }

    character.position = camera.position;
  })

  camera.position = character.position;
  

  //[CLICKS]
  window.addEventListener('mouseup', function(){
    mouseIsDown = false;
  })

  window.addEventListener('mousedown', function(q){
    mouseIsDown = true;
    setInterval(function(){
      var ray = camera.getForwardRay(999);

      function predicate(mesh) {
        if (mesh.id == 'player') {
          return false;
        }
        return true;
      }
  
      var hit = scene.pickWithRay(ray, predicate);
  
      if(hit.pickedMesh.hitBox == true && weaponDebounce2 == false){
          if(pistol==true){
            hit.pickedMesh.health -= randomInt(5,15);
            weaponDebounce(150);
          }
          
          if(shotgun == true && shotgunOwned == true){
            weaponDebounce(56.8)
            //okay so this one is gonna be last so yea
          }
  
          if(chaingun == true && chaingunOwned == true){
            hit.pickedMesh.health -= randomInt(5,15)
            weaponDebounce(525.0)
          }
  
          console.log(hit.pickedMesh.health);
          if(hit.pickedMesh.health<=0){
            hit.pickedMesh.dispose()
        }
      }
    }, 1);
  });
}