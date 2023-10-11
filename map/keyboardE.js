// [IMPORTS]
const map1 = await import("/map/map1.js");


// [VARIABLES]

var [wPressed, aPressed, sPressed, dPressed] = [0, 0, 0, 0];
var [pressedDebounceZ, pressedDebounceX] = [false, false];

// [HELPER FUNCTIONS]

// [PROGRAM]

export function main(){
  const camera = map1.mapParts.camera;

  window.addEventListener("keydown", function(e){
      var forwardsVector = new BABYLON.Vector3(
          Math.sin(camera.rotation.y),
          Math.sin(camera.rotation.x),
          Math.cos(camera.rotation.y - Math.PI)
      ); //incorrect formula but eh, i aint take calculus yet

      if (e.key == 'w' && !pressedDebounceZ) {
          wPressed++;
          pressedDebounceZ = true;
          setTimeout(function(){
            pressedDebounceZ = false;
          }, 188)
    
          if (!camera.isMovingZ) {
            camera.isMovingZ = true;
            {
              var loop_count = 0;
              var loop = setInterval(function(){
                camera.position.addInPlace(forwardsVector.normalize().scaleInPlace(0.1));
                loop_count++;
                renderer.render(scene, camera);
                updateLabels(door, camera);
      
                if (loop_count > 50) {
                  loop_count = 0;
                  wPressed--;
    
                  if (wPressed == 0) {
                    clearInterval(loop);
                    camera.isMovingZ = false;
                  }
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