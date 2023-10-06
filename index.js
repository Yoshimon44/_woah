var e = await import("/map/map1.js");

console.log(e);

window.onload = function(){
    var canvas = document.querySelector("#newCanva");
    var engine = new BABYLON.Engine(canvas, true);

    e.createScene(canvas, engine);

    window.addEventListener("resize", function () {
        engine.resize();
    });
}
