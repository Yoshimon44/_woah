export var mapParts = {}; //these are not 'map parts' 😭😭😭
export var mapPartsReal = {};

export const createScene = (canvas, engine) => {
    const scene = new BABYLON.Scene(engine);
    mapParts.scene = scene; //i cant always create a new scene everytime i want to reference scene
    mapParts.engine = engine;
    mapParts.canvas = canvas;

    const camera = new BABYLON.UniversalCamera("myCamera", new BABYLON.Vector3(0, 1, -10))
    camera.isMovingZ = false;
    camera.isMovingX = false;
    
    camera.ellipsoid = new BABYLON.Vector3(1,1,1);
    mapParts.camera = camera;
    camera.attachControl(canvas, true);

    
    document.querySelector("#newCanva").addEventListener("click", function(){
        // [mouseCamera.js]
        console.log(engine);
        engine.enterPointerlock();
    })

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
    mapParts.light = light;
    light.intensity = 1;

    // [MAP]

    const box = BABYLON.MeshBuilder.CreateBox("box", {width: 10, height: 10});
    mapPartsReal.box = box;

    const box2 = BABYLON.MeshBuilder.CreateBox("box2", {width: 10, height: 10});
    box2.position = new BABYLON.Vector3(-6, 5, -9)
    mapPartsReal.box2 = box2;

    const box3 = BABYLON.MeshBuilder.CreateBox("box2", {width: 10, height: 10});
    box3.position = new BABYLON.Vector3(7, 2, 7)
    mapPartsReal.box3 = box3;

    

    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 50, height: 50});
    mapPartsReal.ground = ground;


    return scene;
}