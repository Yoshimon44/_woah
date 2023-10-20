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


  /*
    map1.mapPartsReal.forEach(function(mapPart) {
    if ("position" in mapPart) {
      if (position.subtract(mapPart.position).length() < nearestPartMagnitude){
        nearestPart = mapPart;
        nearestPartMagnitude = position.subtract(mapPart.position).length();
      }
    }
  });
  */

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

// [PROGRAM]

export function main(){
  const camera = map1.mapParts.camera;
  const character = map1.mapPartsReal.playerCharacter;
  //const havokPlugin = map1.mapPartsReal.havokPlugin;
  const scene = map1.mapParts.scene;

  //scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), havokPlugin);
 // var physicsEngine = scene.getPhysicsEngine();

  setInterval(updateLabel, 1, 'rot', camera.rotation);

  window.addEventListener("keyup", function(e){
    if (listOfKeys.hasOwnProperty(e.key)) {
      listOfKeys[e.key] = false;
    };
  })

  scene.gravity = new BABYLON.Vector3(0, -1.6, 0);

  camera.keysUp = [87];
  camera.keysDown = [83];
  camera.keysLeft = [65];
  camera.keysRight = [68];

  camera.needMoveForGravity = true;

  window.addEventListener("keydown", function(e){

    /*
        if (e.key == "w" && !pressedDebounceZ) {

      console.log(getNearestPart(camera.position));
      listOfKeys.w = true;
      pressedDebounceZ = true;
      var debounceFunc = setTimeout(function(){
        pressedDebounceZ = false;
      }, 188)

      if (!camera.isMovingZ) {
        camera.isMovingZ = true;
        {
          var loop_count = 0;
          var loop = setInterval(function(){
            var forwardsVector = new BABYLON.Vector3(
              Math.sin(camera.rotation.y),
              0, //-Math.sin(camera.rotation.x)
              -Math.cos(camera.rotation.y - Math.PI)
            ); //incorrect formula but eh, i aint take calculus yet

            //camera.position.addInPlace(forwardsVector.normalize().scale(0.1 * moveSpeed));
            character.position.addInPlace(forwardsVector.normalize().scale(0.1 * moveSpeed));
            loop_count++;
            updateLabel("pos", camera.position);
            updateLabel("rot", camera.rotation);

            if (listOfKeys.w == false) {
              clearInterval(loop);
              clearTimeout(debounceFunc);
              pressedDebounceZ = false;
              camera.isMovingZ = false;
            }
          }, 1)
        }
      }
    }

    if (e.key == 's' && !pressedDebounceZ) {
      listOfKeys.s = true;
      pressedDebounceZ = true;
      var debounceFunc = setTimeout(function(){
        pressedDebounceZ = false;
      }, 188)

      if (!camera.isMovingZ) {
        camera.isMovingZ = true;
        {
          var loop_count = 0;
          var loop = setInterval(function(){
            var forwardsVector = new BABYLON.Vector3(
              Math.sin(camera.rotation.y),
              0, //-Math.sin(camera.rotation.x)
              -Math.cos(camera.rotation.y - Math.PI)
            ); //incorrect formula but eh, i aint take calculus yet

            character.position.subtractInPlace(forwardsVector.normalize().scale(0.1 * moveSpeed));
            loop_count++;
            updateLabel("pos", camera.position);
            updateLabel("rot", camera.rotation);

            if (listOfKeys.s == false) {
              clearInterval(loop);
              clearTimeout(debounceFunc);
              pressedDebounceZ = false;
              camera.isMovingZ = false;
            }
          }, 1)
        }
      }
    }

    if (e.key == 'a' && !pressedDebounceX) {
      listOfKeys.a = true;
      pressedDebounceX = true;
      var debounceFunc = setTimeout(function(){
        pressedDebounceX = false;
      }, 188)

      if (!camera.isMovingX) {
        camera.isMovingX = true;
        {
          var loop_count = 0;
          var loop = setInterval(function(){
            var forwardsVector = new BABYLON.Vector3(
              Math.sin(camera.rotation.y + (Math.PI/2)),
              0, //-Math.sin(camera.rotation.x)
              -Math.cos(camera.rotation.y - (Math.PI/2))
            ); 

            character.position.subtractInPlace(forwardsVector.normalize().scale(0.1 * moveSpeed));
            loop_count++;
            updateLabel("pos", camera.position);
            updateLabel("rot", camera.rotation);

            if (listOfKeys.a == false) {
              clearInterval(loop);
              clearTimeout(debounceFunc);
              pressedDebounceX = false;
              camera.isMovingX = false;
            }
          }, 1)
        }
      }
    }

    if (e.key == 'd' && !pressedDebounceX) {
      listOfKeys.d = true;
      pressedDebounceX = true;
      var debounceFunc = setTimeout(function(){
        pressedDebounceX = false;
      }, 188)

      if (!camera.isMovingX) {
        camera.isMovingX = true;
        {
          var loop_count = 0;
          var loop = setInterval(function(){
            var forwardsVector = new BABYLON.Vector3(
              Math.sin(camera.rotation.y - (Math.PI/2)),
              0, //-Math.sin(camera.rotation.x)
              -Math.cos(camera.rotation.y - (Math.PI * 1.5))
            ); 

            character.position.subtractInPlace(forwardsVector.normalize().scale(0.1 * moveSpeed));
            loop_count++;
            updateLabel("pos", camera.position);
            updateLabel("rot", camera.rotation);

            if (listOfKeys.d == false) {
              clearInterval(loop);
              clearTimeout(debounceFunc);
              pressedDebounceX = false;
              camera.isMovingX = false;
            }
          }, 1)
        }
      }
    }
    */

    if (e.code == 'Space') {
      console.log('space pressed.');
      scene.gravity.y = 5;
      console.log(scene.gravity);

      setTimeout(function(){
        scene.gravity.y = -1.6;
        console.log(scene.gravity);
      }, 500)
    }
  
  })

  camera.position = character.position;

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