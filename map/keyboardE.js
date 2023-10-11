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

function updateLabel(label, value) {
  if (value instanceof BABYLON.Vector3) {
    value = `(${parseFloat(value.x.toFixed(2))}, ${parseFloat(value.y.toFixed(2))}, ${parseFloat(value.z.toFixed(2))})`;
  }

  if (typeof label == 'string') {
    label = document.querySelector(`#${label}`);
  }

  if (label == document.querySelector('#pos')) {
    label.innerText = 'Camera position: ';
  } else {
    label.innerText = '';
  }

  label.innerText += value;
}

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
            updateLabel("pos", camera.position);
            updateLabel("rot", camera.rotation);

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