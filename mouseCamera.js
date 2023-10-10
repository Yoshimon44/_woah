// [IMPORTS]
const map1 = await import("/map/map1.js");
const camera = map1.mapParts.camera;

// [PROGRAM]
/*
document.querySelector("#newCanva").addEventListener("mouseover", function(){
    //var [middleX, middleY] = [9, 9];

    console.log(document.querySelector("#newCanva").style);
})
*/

setTimeout(function(){
    console.log(map1.mapParts.engine);
    //map1.mapParts.engine.enterPointerlock();
    map1.mapParts.engine.isPointerLock = true;
}, 1000)