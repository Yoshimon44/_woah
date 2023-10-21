// [IMPORTS]
const map1 = await import("/map/map1.js");

// [VARIABLES]

var [wPressed, aPressed, sPressed, dPressed] = [0, 0, 0, 0];
var [pressedDebounceZ, pressedDebounceX] = [false, false];
var listOfKeys = {
  'w': false,
  'a': false,
  's': false,
  'd': false
};

//WEAPON EQUIP VARIABLES
var fists = false
var pistol = true
var shotgun = false
var chaingun = false
var launcher = false
var plasmaGun = false
var bfg = false

/*
im not sure having separate variables for each of the several weapons is a good idea

in a case where you need to switch from weapon to weapon:

if (e.key == '1') {
  var fists = true
  var pistol = false
  var shotgun = false
  var chaingun = false
  var launcher = false
  var plasmaGun = false
  var bfg = false
} else if (e.key == '2') {
  var fists = false
  var pistol = true
  var shotgun = false
  var chaingun = false
  var launcher = false
  var plasmaGun = false
  var bfg = false
} else if (e.key == '3') {
  var fists = false
  var pistol = false
  var shotgun = true
  var chaingun = false
  var launcher = false
  var plasmaGun = false
  var bfg = false
} else if (e.key == '4') {
  var fists = false
  var pistol = false
  var shotgun = false
  var chaingun = true
  var launcher = false
  var plasmaGun = false
  var bfg = false
} else if (e.key == '5') {
  var fists = false
  var pistol = false
  var shotgun = false
  var chaingun = false
  var launcher = true
  var plasmaGun = false
  var bfg = false
} else if (e.key == '6') {
  var fists = false
  var pistol = false
  var shotgun = false
  var chaingun = false
  var launcher = false
  var plasmaGun = true
  var bfg = false
} else if (e.key == '7') {
  var fists = false
  var pistol = false
  var shotgun = false
  var chaingun = false
  var launcher = false
  var plasmaGun = false
  var bfg = true
}

thats a lot of words

a solution to this would be using less variables

e.g.

var weaponList = ['fists', 'pistol', 'shotgun', 'chaingun', 'launcher', 'plasmaGun', 'bfg']
var currentWeapon = 'pistol'

then the weapon changing thing could be shortened to become something like

if (['1', '2', '3', '4', '5', '6', '7'].includes(e.key)) { //did the user press the valid weapon keys?
  currentWeapon = weaponList[parseInt(e.key) - 1];
}

breakdown:

to get an item from an array, you would type something like 'array[n]', and n would be an integer.
this will get the (n + 1)th item from the array. (basically, 0 gets the first item, 1 gets the second item, 2 gets the third, etc...)

e.key is a string. to grab from an array, you need an integer. thats what parseInt does: transforms its input into its integer counterpart
so now e.key is an integer. but in order to properly use the array, we need to subtract 1 from e.key

thats because array indices start from 0, not 1. this results in 0 being the first item, 1 being the 2nd, 2 being the 3rd, and 7 being the non-existent 8th.
this offset causes several issues:
  -pressing 1 will not get you 'fists', it will get you 'pistol'
  -pressing 7 will either result in an error or the user would end up not having a weapon.
  -basically all the keys get you the wrong weapon
  -'fists' is unusable

to fix this, we have to remove the offset, hence why I would subtract 1 from e.key.
this way, pressing 1 gets you the first weapon, pressing 2 gets you the second weapon, and pressing 7 won't mess everything up.
*/

//WEAPON OWNED VARIABLES


var moveSpeed = 1; //percentage of the walkSpeed.

var nearestPartMagnitude; //used in getNearestPart.

// [HELPER FUNCTIONS]

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
    elapsedTime += 50;
    scene.gravity.y = jumpFunction(elapsedTime * 0.001);

    if (elapsedTime >= 6001) {
      clearInterval(animation);
      return;
    }
  }, 1)
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

  window.addEventListener("keydown", function(e){
    if (e.code == 'Space') {
      console.log('space pressed.');
      jump(scene);
    }
  
    //[I NEED MORE BOOLETS]
    if(e.key == '1'){
      fists = true
      
    }
  })

  camera.position = character.position;  

  //[CLICKS]
  window.addEventListener('click', function(q){
    console.log("Click!")
    var ray = camera.getForwardRay(999);

    function predicate(mesh) {
      if (mesh.id == 'player') {
        return false;
      }
      return true;
    }

    var hit = scene.pickWithRay(ray, predicate);



    if(hit.pickedMesh.hitBox == true && hit.pickedMesh != null){
      console.log("Hit!");
    }
    var spread = Math.random()*5
  });
}