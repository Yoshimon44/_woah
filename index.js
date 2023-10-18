var e = await import("/map/map1.js");
var p = await import("/map/keyboardE.js");

console.log(p);

export async function main(){ //i wanna try out promises
    var canvas = document.querySelector("#newCanva");
    var engine = new BABYLON.Engine(canvas, true);

    var scene = await e.createScene(canvas, engine);

    console.log(scene);

    engine.runRenderLoop(function(){
        scene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });

    //[call ur modules here lel]
    var keyboardGood = await p.main();

    console.log('is runnings');

    document.body.remove(document.querySelector("#loadingScreen"));
}

//setTimeout(main, 1000);

// [PROGRAM]
const loadingScreen = document.querySelector('#loadingScreen');

main();