// [IMPORTS]
const map1 = await import("/map/map1.js");
const camera = map1.mapParts.camera;

// [PROGRAM]
document.querySelector("#newCanva").addEventListener("mouseover", function(){
    var [middleX, middleY] = [9, 9];

    console.log(document.querySelector("#newCanva").style);
})