//gonna (eventually) be the enemy ai file.

export class Enemy { //may not be the system we will use in the deliverable
    constructor() {

    }
}

export class TestDummy {
    constructor(){
        this.material = new BABYLON.StandardMaterial('enemy' + Date.now().toString() + '_material');
        this.material.diffuseTexture = new BABYLON.Texture('/sprites/10-28-23_TestSprite.png');

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

        return this;
    }
}