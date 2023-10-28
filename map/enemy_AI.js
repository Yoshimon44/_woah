//gonna (eventually) be the enemy ai file.

export class Enemy { //may not be the system we will use in the deliverable
    constructor() {

    }
}

export class TestDummy {
    constructor(){
        this.character = BABYLON.MeshBuilder.CreateBox('enemy' + Date.now().toString(), {width: 5, height: 5, depth: 2});
        this.character.position = new BABYLON.Vector3(-10, 1, 10);
        this.character.billboardMode = 2;

        return this;
    }
}