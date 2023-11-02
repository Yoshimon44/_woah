//gonna (eventually) be the enemy ai file.

function filePathParser(hecknaw){
    if (hecknaw.substring(0, 1) == '/') {
      if (window.location.href != 'https://yoshimon44.github.io/_woah/') {
        return hecknaw;
      } else {
        return "/_woah/" + hecknaw;
      }
    }
  }


export class Enemy { //may not be the system we will use in the deliverable
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
        let walkingCharacter = this.character;
        
        if (this.character == null) {
            return;
        } else {
            console.log(this);
            console.log(this.character);
        }

        const startPosition = this.character.position.clone();

        this.playAnimation('run');
        /*
        while (BABYLON.Vector3.Distance(startPosition, this.character.position) < BABYLON.Vector3.Distance(startPosition, point)) {
            this.character.position.addInPlace(
                point.subtract(startPosition)
            );
        }
        */

        

        var walkLoop = setInterval(function(){
            walkingCharacter.position.addInPlace(
                point.subtract(startPosition).normalize().scale(walkingCharacter.walkSpeed/50)
            );
            console.log(point.subtract(startPosition).normalize().scale(walkingCharacter.walkSpeed/50))
            console.log(BABYLON.Vector3.Distance(startPosition, walkingCharacter.position))
            console.log(BABYLON.Vector3.Distance(startPosition, point))

            if (BABYLON.Vector3.Distance(startPosition, walkingCharacter.position) >= BABYLON.Vector3.Distance(startPosition, point)) {
                clearInterval(walkLoop);
                return;
            }
        }, 1)
        
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


//oh yeah i could make the parent class here and separate enemy types can inherit from this one... stupid me...