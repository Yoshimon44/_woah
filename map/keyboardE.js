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

// [HELPER FUNCTIONS]

// [PROGRAM]

export function main(){
  const camera = map1.mapParts.camera;

  window.addEventListener("keyup", function(e){
    if (listOfKeys.hasOwnProperty(e.key)) {
      listOfKeys[e.key] = false;
    };
  })

  window.addEventListener("keydown", function(e){
    if (e.key == "w" && !pressedDebounceZ) {
      listOfKeys.w = true;
      pressedDebounceZ = true;
      setTimeout(function(){
        pressedDebounceZ = false;
      }, 188)

      if (!camera.isMovingZ) {
        camera.isMovingZ = true;
        {
          var loop_count = 0;
          var loop = setInterval(function(){
            var forwardsVector = new BABYLON.Vector3(
              Math.sin(camera.rotation.y),
              -Math.sin(camera.rotation.x),
              -Math.cos(camera.rotation.y - Math.PI)
            ); //incorrect formula but eh, i aint take calculus yet

            camera.position.addInPlace(forwardsVector.normalize().scale(0.1));
            loop_count++;

            if (listOfKeys.w == false) {
              clearInterval(loop);
              camera.isMovingZ = false;
            }
          }, 1)
        }
      }
    }


    if (e.key == 's' && !pressedDebounceZ) {

    }

    if (e.key == 'a' && !pressedDebounceX) {

    }

    if (e.key == 'd' && !pressedDebounceX) {

    }
  })
}