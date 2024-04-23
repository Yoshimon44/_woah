//gonna (eventually) be the enemy ai file.

//import recast from filePathParser('/recast/recast/recast.js')
import recast from "/recast/recast/recast.js";

console.log(recast);

var Recast = await recast();
var RecastPlugin = new BABYLON.RecastJSPlugin(Recast);

var map1;

if (window.location.href != 'https://yoshimon44.github.io/_woah/') {
  map1 = await import("/map/map1.js");
} else {
  map1 = await import("/_woah/map/map1.js");
}

function filePathParser(hecknaw){
    if (hecknaw.substring(0, 1) == '/') {
      if (window.location.href != 'https://yoshimon44.github.io/_woah/') {
        return hecknaw;
      } else {
        return "/_woah/" + hecknaw;
      }
    } else {
        if (window.location.href != 'https://yoshimon44.github.io/_woah/') {
            return hecknaw;
          } else {
            return "_woah/" + hecknaw;
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

    pathfindTo(enemy) {
        if (!this.character) {
            return;
        }

        console.log('woah 1')
        var isPathBlocked = false;

        var checkIfPathToPointIsBlocked = new BABYLON.Ray(this.character.position, enemy.position.subtract(this.character.position).normalize(), 5000000);
        var closestObstacle = this.character.getScene().pickWithRay(checkIfPathToPointIsBlocked, (e) => {
            if (e.id == this.character.id) {
                return false;
            }
            return true;
        });

        console.log('woah 2');
        console.log(closestObstacle);

        if (closestObstacle.hit == false) {
            checkIfPathToPointIsBlocked = new BABYLON.Ray(this.character.position, this.character.position.subtract(enemy.position).normalize(), 5000000);
            closestObstacle = this.character.getScene().pickWithRay(checkIfPathToPointIsBlocked, (e) => {
                if (e.id == this.character.id) {
                    return false;
                }
                return true;
            });
        }

        console.log('woah 3');
        console.log(closestObstacle);

        if (closestObstacle.pickedMesh.id == "player") {
            console.log('woah 4');
            this.walkTo(enemy.position);
        } else { //the 'hard bits'. actually not hard because babylon already has enemy ai i believe
            const parameters = {
                cs: 0.2,
                ch: 0.2,
                walkableSlopeAngle: 35,
                walkableHeight: 1,
                walkableClimb: 1,
                walkableRadius: 1,
                maxEdgeLen: 12,
                maxSimplificationError: 1.3,
                minRegionArea: 8,
                mergeRegionArea: 20,
                maxVertsPerPoly: 6,
                detailSampleDist: 6,
                detailSampleMaxError: 1,
              };

              //RecastPlugin.createNavMesh(map1.mapPartsReal, parameters);

        }
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