export var mapParts = {};

export const createScene = (canvas, engine) => {
    const scene = new BABYLON.Scene(engine);
    mapParts.scene = scene; //i cant always create a new scene everytime i want to reference scene
    mapParts.engine = engine;
    mapParts.canvas = canvas;

    const camera = new BABYLON.UniversalCamera("myCamera", new BABYLON.Vector3(0, -4, -10))
    camera.isMovingZ = false;
    camera.isMovingX = false;

    mapParts.camera = camera;
    camera.attachControl(canvas, true);


    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
    mapParts.light = light;
    light.intensity(1)

    const box = BABYLON.MeshBuilder.CreateBox("box", {width: 100, height: 100});
    mapParts.box = box;

    camera.setTarget(box._position);

    return scene;
}
