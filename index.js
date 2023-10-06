window.onload = function(){
    var canvas = document.querySelector("#newCanva");
    var engine = new BABYLON.Engine(canvas, true);

    function createScene(){

    }

    var scene = createScene();
    window.addEventListener("resize", function () {
        engine.resize();
    });
}