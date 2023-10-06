export const createScene = (canvas, engine) => {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.UniversalCamera("myCamera", new BABYLON.Vector3(0, 0, 0))
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));

    const box = BABYLON.MeshBuilder.CreateBox("box", {});

    camera.setTarget(box.position);

    return scene;
}
