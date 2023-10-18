console.log('what issues?')

var e = import("/map/map1.js").then(function(module1){
    console.log("IM GOOD");
    e = module1;
    return module1;
}).catch(function(err){
    console.log(err);
})


console.log(e);

var p = import("/map/keyboardE.js").then(function(module1){
    console.log("IM GOOD");
    p = module1;
    return module1;
}).catch(function(err){
    console.log(err);
})

if (p instanceof Promise) {
    console.log('e');
}

var active = false;

async function main(){ //i wanna try out promises
    if (e instanceof Promise || p instanceof Promise) {
        if (!active) {
            active = true;
            main();
            {
                setTimeout(function(){
                    active = false;
                }, 1000);
            }
        }
        return;
    }

    console.log('errrr!!');

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

    //[call ur modules here lel]
    p.main();

    console.log('is runnings');

    
}

//setTimeout(main, 1000);

// [PROGRAM]

console.log('errrrr!!!t');

main();