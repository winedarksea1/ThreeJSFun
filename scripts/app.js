var example = (function () {
  "use strict";

  window.onload = initScene;
  window.addEventListener("mousedown", onDocumentMouseDown, false);

  var scene = new THREE.Scene();
  var renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
  var light = new THREE.AmbientLight(0xffffff);
  var camera;
  var box;
  var stats;
  var clock = THREE.Clock();
  var objects = [];

  function initScene () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("webgl-container").appendChild(renderer.domElement);
    scene.add(light);

    camera = new THREE.PerspectiveCamera(35,
                                        window.innerWidth/window.innerHeight,
                                        1,
                                        1000);
    camera.position.z = 100;
    scene.add(camera);

    box = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), new THREE.MeshBasicMaterial({color: 0xFF0000}));
    box.name = "box";
    scene.add(box);

    // CREATE A SECOND BOX
    var box2BoxGeometry = new THREE.BoxGeometry(20, 20, 20);
    var box2Material = new THREE.MeshLambertMaterial({color: 0x0000FF});
    var box2 = new THREE.Mesh(box2BoxGeometry, box2Material);
    box2.position.x = -40;
    scene.add(box2);

    objects.push(box);
    objects.push(box2);

    render();
  }

  // create mousedown function
  function onDocumentMouseDown(e) {
    e.preventDefault();
    var projector = new THREE.Projector();

    var mouseClickVector = new THREE.Vector3(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1,
      0.5
    );

    projector.unprojectVector(mouseClickVector, camera);

    var raycaster = new THREE.Raycaster(
      mouseClickVector.sub(camera.position).normalize()
    );

    var intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
      intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
    }
  }

  function render() {
    if (clock) {
      var delta = clock.getDelta();
      controls.update(delta);
    }

    box.rotation.y += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  return {
    scene: scene
  };
})();
