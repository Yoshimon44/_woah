// [IMPORTS]
var map1;

if (window.location.href != 'https://yoshimon44.github.io/_woah/') {
  map1 = await import("/map/map1.js");
} else {
  map1 = await import("/_woah/map/map1.js");
}
//const enemy_AI = await import("/map/enemy_AI.js");

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

//WEAPON AMMO VARIABLES


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

export function createProjectile(camera, collidableObjects = [], collisionCallbackFn = function(){}){ //jus farding
  let projectileRay = camera.getForwardRay();

  let spitBall = BABYLON.MeshBuilder.CreateBox('spitBall' + Date.now().toString());
  spitBall.position = projectileRay.origin;
  spitBall.lookAt(spitBall.position.add(projectileRay.direction.scale(20)));

  function onCollision(hitMesh){
    clearInterval(fly);
    if (hitMesh) {
      if(hitMesh.enemy == true) {
        hitMesh.health -= randomInt(5, 400)
        collisionCallbackFn();
      }
    }
    spitBall.dispose();
  }

  let loopCount = 0;
  let fly = setInterval(function(){
    spitBall.position.addInPlace(projectileRay.direction.scale(0.5));
    loopCount++;

    collidableObjects.forEach(function(e){
      if (spitBall.intersectsMesh(e)) {
        onCollision(e);
      }
    });

    if (loopCount > 1500) { //still needs to be thrown away if it goes too far without hitting nobody
      onCollision();
    }
  }, 1);
}

function filePathParser(hecknaw){
  if (hecknaw.substring(0, 1) == '/') {
    if (window.location.href != 'https://yoshimon44.github.io/_woah/') {
      return hecknaw;
    } else {
      return "/_woah/" + hecknaw;
    }
  }
}

// [PROGRAM]

export function main(){
  const camera = map1.mapParts.camera;
  const character = map1.mapPartsReal.playerCharacter;
  const scene = map1.mapParts.scene;

  if (camera == null) {
    setTimeout(function(){
      main();
      console.log('hahahahahaha ahahahhad adi asjg uiawy wiofawiofleyfo subk fAUFI asdlfi oye 0');
    }, 50);
    return;
  }

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

    if (e.key=='l') {
      console.log(character.position.subtract(map1.mapPartsReal.localEnemy.character.position))
      console.log(character.position.subtract(character.position.subtract(map1.mapPartsReal.localEnemy.character.position)))

      map1.mapPartsReal.localEnemy.walkTo(character.position.add(
        character.position.subtract(map1.mapPartsReal.localEnemy.character.position).normalize().scale(-10)
      ));
    }

    character.position = camera.position;
  })

  camera.position = character.position;
  

  //[CLICKS]
  window.addEventListener('mouseup', function(){
    mouseIsDown = false;
  })

  window.addEventListener('mousedown', function(q){
    if (!mouseIsDown) {
      mouseIsDown = true;
    }

    var mouseLoopity = setInterval(function(){
      var ray = camera.getForwardRay(999);

      function predicate(mesh) {
        if (mesh.id == 'player') {
          return false;
        }
        return true;
      }
  
      var hit = scene.pickWithRay(ray, predicate);

      if (!weaponDebounce2 && hit.pickedMesh != null) {
        console.log('case 1');
        createProjectile(camera, [hit.pickedMesh], function(){
          if ("enemySpecialObject" in hit.pickedMesh) {
            hit.pickedMesh.enemySpecialObject.health -= randomInt(5,40);
          } else {
            hit.pickedMesh.health -= randomInt(5, 40);
          }
        });
      } else if (!weaponDebounce2) {
        console.log('case 2')
        createProjectile(camera);
        weaponDebounce(1000);   
      }

      //hits enemyee
      //disposes no matter what but only take health away whern ene,my

      if(pistol==true){
        if (hit.pickedMesh) {
          if ("hitBox" in hit.pickedMesh) {
            if(hit.pickedMesh.hitBox == true && weaponDebounce2 == false){
              if ("enemySpecialObject" in hit.pickedMesh) {
                hit.pickedMesh.enemySpecialObject.health -= randomInt(5, 15);
                weaponDebounce(150);
              } else {
                hit.pickedMesh.health -= randomInt(5,15);
                weaponDebounce(150);
              }
            }
          }
        }

        
      }

      if(shotgun == true && weaponDebounce2 == false && shotgunOwned == true){
        weaponDebounce(56.8)
        //okay so this one is gonna be last so yea
      }

      if(chaingun == true && weaponDebounce2 == false /*&& chaingunOwned == true*/){
        hit.pickedMesh.health -= randomInt(5,15)
        weaponDebounce(525.0)
      }

      if(launcher == true && weaponDebounce2 == false /*&& launcherOwned == true*/){
        console.log(hit.pickedMesh.health)
        //this is gonna need splash somehow, i believe
      }

      if(plasmaGun == true && weaponDebounce2 == false /*&& plasmaGunOwned == true*/){
        createProjectile(camera);

        weaponDebounce(700)
      }

      if(bfg == true && weaponDebounce2 == false /*&& bfgOwned == true*/){
        console.log("unfinished")
      }

      if (hit.pickedMesh) {
        if(hit.pickedMesh.health<=0 /*&& enemy != true*/){
          hit.pickedMesh.dispose()
        }
      }
    

      if (!mouseIsDown) {
        clearInterval(mouseLoopity);
        return;
      }
    }, 1);
  });
}