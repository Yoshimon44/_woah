var e = await import("/map/map1.js");

console.log(e);

function main(){
    var canvas = document.querySelector("#newCanva");
    var engine = new BABYLON.Engine(canvas, true);

    var scene = e.createScene(canvas, engine);

    console.log(scene);

    engine.runRenderLoop(function(){
        scene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });
}

window.addEventListener("DOMContentLoaded", function(e){
    console.log("loaded!!!")
    main();
});

//setTimeout(main, 1000);