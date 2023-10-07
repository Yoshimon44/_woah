// [IMPORTS]
const map1 = await import("/map/map1.js");
const camera = map1.mapParts.camera;

// [VARIABLES]

var [wPressed, aPressed, sPressed, dPressed] = [0, 0, 0, 0];
var [pressedDebounceZ, pressedDebounceX] = [false, false];

// [HELPER FUNCTIONS]

// [PROGRAM]

export function main(){
    window.addEventListener("keydown", function(e){
        var forwardsVector = new BABYLON.Vector3(
            Math.sin(camera.rotation.y),
            0,
            Math.cos(camera.rotation.y - Math.PI)
        ); //incorrect formula but eh, i aint take calculus yet

        if (e.key == 'w' && !pressedDebounceZ) {

        } 

        if (e.key == 's' && !pressedDebounceZ) {

        }

        if (e.key == 'a' && !pressedDebounceX) {

        }

        if (e.key == 'd' && !pressedDebounceX) {

        }
    })
}