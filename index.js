window.onload = function(){
    var canvas = document.querySelector("#newCanva");
    var engine = new BABYLON.Engine(canvas, true);

    window.addEventListener("resize", function () {
        engine.resize();
    });
}