export var mapParts = {}; //for testing purposes

export const createScene = (canvas, engine) => {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.UniversalCamera("myCamera", new BABYLON.Vector3(0, 0, 0))
    mapParts.camera = camera;
    camera.attachControl(canvas, true);


    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
    mapParts.light = light;

    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    mapParts.box = box;

    camera.setTarget(box.position);

    return scene;
}
