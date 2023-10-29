//gonna (eventually) be the enemy ai file.

export class Enemy { //may not be the system we will use in the deliverable
    constructor() {

    }
}

export class TestDummy {
    switchAlphaTexture(texture) {
        this.material.diffuseTexture = texture;
        this.material.diffuseTexture.hasAlpha = true;
        this.material.useAlphaFromDiffuseTexture = true;
    }

    constructor(){
        this.material = new BABYLON.StandardMaterial('enemy' + Date.now().toString() + '_material');
        this.material.diffuseTexture = new BABYLON.Texture('/sprites/10-28-23_TestSprite.png');
        this.material.diffuseTexture.hasAlpha = true;
        this.material.useAlphaFromDiffuseTexture = true;

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