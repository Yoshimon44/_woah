var enemy_AI, index;


if (window.location.href != 'https://yoshimon44.github.io/_woah/') {
    enemy_AI = await import("/map/enemy_AI.js");
    index = await import("/index.js");
} else {
    enemy_AI = await import("/_woah/map/enemy_AI.js");
    index = await import("/_woah/index.js");
}

export var mapParts = {}; //these are not 'map parts' 😭😭😭
export var mapPartsReal = {};
export var hitBox;
export var health;
export var enemy;

export class TestDummy extends enemy_AI.Enemy {
    constructor(pos = new BABYLON.Vector3(-20, 1, 10)){
        super();

        // [CHARACTER MODEL]
        this.material = new BABYLON.StandardMaterial('enemy' + Date.now().toString() + '_material');
        this.switchAlphaTexture(new BABYLON.Texture(filePathParser('/sprites/10-28-23_TestSprite.png')));

        let faceMap = [];

        for (var i = 1; i <= 6; i++) {
            if (i == 1) {
                faceMap[1] = new BABYLON.Vector4(0, 0, 1, 1);
            } else {
                faceMap[i] = new BABYLON.Vector4(0, 0, 0.01, 0.01);
            }
        }

        this.character = BABYLON.MeshBuilder.CreateBox('enemy' + Date.now().toString(), {width: 5, height: 5, depth: 2, faceUV: faceMap, wrap: true});
        this.character.position = pos;
        this.character.billboardMode = 2;
        this.character.material = this.material;

        this.character.checkCollisions = true;
        this.character.hitBox = true;
        this.character.health = 190000;
        this.character.enemy = true;

        this.character.enemySpecialObject = this; //this way i can properly interact with the enemy and stuff
        // [CHARACTER PROPERTIES]
        this.character.walkSpeed = 16;

        return this;
    }

    get health(){
        console.log('testing the inheritance');
        return this.character.health;
    }

    set health(health){
        console.log(this.character);
        if (this.character.health > health) {
            this.switchAlphaTexture(new BABYLON.Texture(filePathParser('/sprites/10-28-23_TestSprite-Pain.png')));
            setTimeout(()=>{
                this.switchAlphaTexture(new BABYLON.Texture(filePathParser('/sprites/10-28-23_TestSprite.png')));
            }, 500)
        }

        this.character.health = health;
    }


}



//const havokInstance = await HavokPhysics();

function filePathParser(hecknaw){
    if (hecknaw.substring(0, 1) == '/') {
      if (window.location.href != 'https://yoshimon44.github.io/_woah/') {
        return hecknaw;
      } else {
        return "/_woah/" + hecknaw;
      }
    }
}

export function makeStair(startPos, endPos, steps, stairLength) { //i dont like messy code soooooo
    var stairDistance2 = ((endPos.subtract(startPos)).scale(1/steps)); //js doesnt support operator overloading so sad man
    var stairDistance = BABYLON.Vector3.Distance(endPos, startPos);

    for (var i = 1; i <= steps; i++) {
        var stairstep = BABYLON.MeshBuilder.CreateBox("stair" + i.toString());
        stairstep.position = startPos.add(stairDistance2.scale(i));

        stairstep.scaling = new BABYLON.Vector3(stairLength, stairDistance * (i/steps), stairDistance/steps);

        console.log("stair" + i.toString());
    }

    var doodoo_ball_9000 =  BABYLON.MeshBuilder.CreateBox("STOCK GOIN UPPPPP", {width: 9, height: 9, depth: 5});
}


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
    scene.gravity = new BABYLON.Vector3(0, -320000, 0); //possible gravity, needs further testing

    camera.applyGravity = true;
    
    camera.ellipsoid = new BABYLON.Vector3(1.35, 1, 1.35); //jus to fit the playerCharacter
    camera.ellipsoidOffset = new BABYLON.Vector3(0, camera.ellipsoid.y, 0);
    mapParts.camera = camera;
    camera.attachControl(canvas, true);

    
    document.querySelector("#newCanva").addEventListener("click", function(){
        // [mouseCamera.js]
        //console.log(engine);
        engine.enterPointerlock();
    })

    const playerCharacter = BABYLON.MeshBuilder.CreateBox("player", {width: 4, height: 1, depth: 4});
    playerCharacter.position = camera.position;
    mapPartsReal.playerCharacter = playerCharacter;

    hitBox = playerCharacter;

    const characterMaterial = new BABYLON.StandardMaterial("texture1");

    playerCharacter.material = characterMaterial
    characterMaterial.alpha = 0;
    characterMaterial.emissiveColor = new BABYLON.Color3(100, 0, 255);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
    mapParts.light = light;
    light.intensity = 0.7;


    // [MAP]

    const box = BABYLON.MeshBuilder.CreateBox("box", {width: 5, height: 10});
    box.checkCollisions = true;
    mapPartsReal.box = box;
    box.hitBox = true
    box.health = 100;
    

    const box2 = BABYLON.MeshBuilder.CreateBox("box2", {width: 5, height: 10});
    box2.position = new BABYLON.Vector3(-6, 5, -9)
    box2.checkCollisions = true;
    mapPartsReal.box2 = box2;
    box2.hitBox = true;
    box2.health = 203829;

    const box3 = BABYLON.MeshBuilder.CreateBox("box2", {width: 5, height: 10});
    box3.position = new BABYLON.Vector3(7, 2, 7)
    box3.checkCollisions = true;
    mapPartsReal.box3 = box3;
    box3.hitBox = true;
    box3.health = 8000000;
    

    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 500, height: 50});
    ground.checkCollisions = true;
    mapPartsReal.ground = ground;

    const wall1 = BABYLON.MeshBuilder.CreateBox("wall1", {width: 50, height:10})
    wall1.setposition = new BABYLON.Vector3(500, 5, 500)
    wall1.checkCollisions = true;
    mapPartsReal.wall1 = wall1;



    const localEnemy = new TestDummy();
    mapPartsReal.localEnemy = localEnemy;

    // [HAVOK]

    
    //const havokPlugin = new BABYLON.HavokPlugin(true, havokInstance);
    //mapPartsReal.havokPlugin = havokPlugin;

    // [LOADIGN SCREENE]
    
    document.querySelector("#loadingScreen").setAttribute('hidden', true);

    return scene;
}