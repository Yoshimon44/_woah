export var mapParts = {}; //these are not 'map parts' 😭😭😭
export var mapPartsReal = {};
export var hitBox;
export var health;

const index = await import("/index.js");

//const havokInstance = await HavokPhysics();

export const createScene = (canvas, engine) => {

    const loadingScreen = document.querySelector('#loadingScreen');

    const scene = new BABYLON.Scene(engine);
    scene.collisionsEnabled = true;
    mapParts.scene = scene; //i cant always create a new scene everytime i want to reference scene
    mapParts.engine = engine;
    mapParts.canvas = canvas;

    const camera = new BABYLON.UniversalCamera("myCamera", new BABYLON.Vector3(0, 1, -10));
    camera.checkCollisions = true;
    camera.isMovingZ = false;
    camera.isMovingX = false; 
    scene.gravity = new BABYLON.Vector3(0, -0.6, 0); //possible gravity, needs further testing

    camera.applyGravity = true;
    
    camera.ellipsoid = new BABYLON.Vector3(1.5,0.5,1); //jus to fit the playerCharacter
    mapParts.camera = camera;
    camera.attachControl(canvas, true);

    
    document.querySelector("#newCanva").addEventListener("click", function(){
        // [mouseCamera.js]
        //console.log(engine);
        engine.enterPointerlock();
    })

    const playerCharacter = BABYLON.MeshBuilder.CreateBox("player", {width: 1, height: 1, depth: 1});
    playerCharacter.position = camera.position;
    mapPartsReal.playerCharacter = playerCharacter;

    hitBox = playerCharacter;

    const characterMaterial = new BABYLON.StandardMaterial("texture1");

    playerCharacter.material = characterMaterial
    characterMaterial.alpha = 0.1;
    characterMaterial.emissiveColor = new BABYLON.Color3(100, 0, 255);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
    mapParts.light = light;
    light.intensity = 0.7;

    // [MAP]

    const box = BABYLON.MeshBuilder.CreateBox("box", {width: 10, height: 10});
    box.checkCollisions = true;
    mapPartsReal.box = box;
    box.hitBox = true
    box.health = 100;


    const box2 = BABYLON.MeshBuilder.CreateBox("box2", {width: 10, height: 10});
    box2.position = new BABYLON.Vector3(-6, 5, -9)
    box2.checkCollisions = true;
    mapPartsReal.box2 = box2;
    box2.hitBox = true;
    box2.health = 100;

    const box3 = BABYLON.MeshBuilder.CreateBox("box2", {width: 10, height: 10});
    box3.position = new BABYLON.Vector3(7, 2, 7)
    box3.checkCollisions = true;
    mapPartsReal.box3 = box3;
    box3.hitBox = true;
    box3.health = 100;
    

    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 50, height: 50});
    ground.checkCollisions = true;
    mapPartsReal.ground = ground;

    // [HAVOK]

    
    //const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);
    //mapPartsReal.havokPlugin = havokPlugin;

    // [LOADIGN SCREENE]
    
    document.querySelector("#loadingScreen").setAttribute('hidden', true);

    return scene;
}