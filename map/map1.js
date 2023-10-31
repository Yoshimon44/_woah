export var mapParts = {}; //these are not 'map parts' 😭😭😭
export var mapPartsReal = {};
export var hitBox;
export var health;

export class TestDummy {
    switchAlphaTexture(texture) {
        this.material.diffuseTexture = texture;
        this.material.diffuseTexture.hasAlpha = true;
        this.material.useAlphaFromDiffuseTexture = true;

        this.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    }

    playAnimation(animName) {
        console.log(animName); //not doing this yet
    }

    walkTo(point) {
        if (this.character == null) {
            return;
        }

        const startPosition = this.character.position;

        this.playAnimation('run');
        while (BABYLON.Vector3.Distance(startPosition, this.character.position) < BABYLON.Vector3.Distance(startPosition, point)) {
            this.character.position.addInPlace(
                startPosition.subtract(point)
            );
        }
        
    }

    constructor(){
        // [CHARACTER MODEL]
        {
            this.material = new BABYLON.StandardMaterial('enemy' + Date.now().toString() + '_material');
            this.switchAlphaTexture(new BABYLON.Texture('/sprites/10-28-23_TestSprite.png'));
    
            let faceMap = [];
    
            for (var i = 1; i <= 6; i++) {
                if (i == 1) {
                    faceMap[1] = new BABYLON.Vector4(0, 0, 1, 1);
                } else {
                    faceMap[i] = new BABYLON.Vector4(0, 0, 0.01, 0.01);
                }
            }
    
            this.character = BABYLON.MeshBuilder.CreateBox('enemy' + Date.now().toString(), {width: 5, height: 5, depth: 2, faceUV: faceMap, wrap: true});
            this.character.position = new BABYLON.Vector3(-20, 1, -10);
            this.character.billboardMode = 2;
            this.character.material = this.material;
    
            this.character.checkCollisions = true;
            this.character.hitBox = true;
            this.character.health = 190000;
    
            this.character.enemySpecialObject = this; //this way i can properly interact with the enemy and stuff
        }
        // [CHARACTER PROPERTIES]
        {
            this.character.walkSpeed = 16;
        }

        return this;
    }

    get health(){
        return this.character.health;
    }

    set health(health){
        if (this.character.health > health) {
            this.switchAlphaTexture(new BABYLON.Texture('/sprites/10-28-23_TestSprite-Pain.png'));
            setTimeout(()=>{
                this.switchAlphaTexture(new BABYLON.Texture('/sprites/10-28-23_TestSprite.png'));
            }, 500)
        }

        this.character.health = health;
    }


}

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
    

    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 500, length: 500, height: 50});
    ground.checkCollisions = true;
    mapPartsReal.ground = ground;

    const wall1 = BABYLON.MeshBuilder.CreateBox("wall1", {width: 500, height:10})
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