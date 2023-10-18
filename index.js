console.log('what issues?')

var e = await import("/map/map1.js")


console.log(e);

var p = await import("/map/keyboardE.js")

console.log(p);

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
    } else {
        console.log(e);
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

console.log(e);
console.log(p);

main();