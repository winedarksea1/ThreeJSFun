var example = (function () {
  "use strict";

  window.onload = initScene;

  var scene = new THREE.Scene();
  var renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
  var light = new THREE.AmbientLight(0xffffff);
  var camera;
  var stats;
  var loader;
  var spaceship;
  var modelPath = "models/Zenith_OBJ.json";

  function initScene () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("webgl-container").appendChild(renderer.domElement);
    scene.add(light);

    camera = new THREE.PerspectiveCamera(35,
                                        window.innerWidth/window.innerHeight,
                                        1,
                                        1000);
    camera.position.set(0, 0, 20);
    scene.add(camera);



    // set up loader
    // loader = new THREE.ObjectLoader();
    // loader.load(model, function (geometry, materials) {
    //   console.log("MODEL LOADED!!!");
    //   var material = new THREE.MeshLambertMaterial({
    //     color: 0xFF0000,
    //     wireframe: true
    //   });
    //
    //   object.traverse(function(child) {
    //       if (child instanceof THREE.Mesh) {
    //           child.material = materialObj;
    //       }
    //   });
    //
    //
    //   monster = new THREE.Mesh(geometry, material);
    //   scene.add(monster);
    //
    //   render();
    // });
    var loader = new THREE.ObjectLoader();
    loader.load(modelPath, function(obj) {
    console.log("Object Loaded!!");
    spaceship = obj;
    // if you want to add your custom material
    var materialObj = new THREE.MeshBasicMaterial({color: 0x363636});
    spaceship.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            child.material = materialObj;
        }
    });

    // then directly add the object
    // spaceship.material = materialObj;
    spaceship.position.set(0, 0, 0);
    scene.add(spaceship);

    render();
    });
    // Create the geometry


    // set up Stats
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);

  }

  function render() {
    // manualGeometry.rotation.y += 0.01;

    if (spaceship) {
      spaceship.rotation.x += 0.01;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);

    stats.update();
  }

  return {
    scene: scene,
  };
})();
