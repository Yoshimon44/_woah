console.log('what issues?')
//https://yoshimon44.github.io/_woah/
console.log(window.location.href)
var e, p;

Promise.resolve(import(filePathParser("/map/map1.js"))).then(function(e2){
    console.log('BALMAIN JEANS FIT LIKE THIS 1')
    e = e2;
});

Promise.resolve(import(filePathParser("/map/keyboardE.js"))).then(function(e2){
    console.log('BALMAIN JEANS FIT LIKE THIS 2')
    p = e2;
})



/*
if (window.location.href != 'https://yoshimon44.github.io/_woah/') {
    Promise.resolve(import("/map/map1.js")).then(function(e2){
        e = e2;
    });
    
    Promise.resolve(import("/map/keyboardE.js")).then(function(e2){
        p = e2;
    })
} else {
    console.log('huh that kel tec gon make a brudda flip like gymnastics')
    Promise.resolve(import("/_woah/map/map1.js")).then(function(e2){
        e = e2;
    });
    
    Promise.resolve(import("/_woah/map/keyboardE.js")).then(function(e2){
        p = e2;
    })
}
*/

var active = false;

function filePathParser(hecknaw){
    if (hecknaw.substring(0, 1) == '/') {
      if (window.location.href != 'https://yoshimon44.github.io/_woah/') {
        return hecknaw;
      } else {
        return "/_woah/" + hecknaw;
      }
    } else {
        if (window.location.href != 'https://yoshimon44.github.io/_woah/') {
            return '/' + hecknaw;
          } else {
            return "_woah/" + hecknaw;
          }        
    }
}


async function main(){ //i wanna try out promises
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

var x123 = setInterval(function(){
    if (e) {
        if (p) {
            main();
            clearInterval(x123);
        }
    }
}, 1000);