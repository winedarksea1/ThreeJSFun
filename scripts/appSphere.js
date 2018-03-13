var example = (function () {
  "use strict";

  window.onload = initScene;

  var scene = new THREE.Scene();
  var renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
  var light = new THREE.AmbientLight(0xffffff);
  var camera;
  var sphere;
  var stats;
  var geometry;
  var material;

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

    geometry = new THREE.SphereGeometry(20, 150, 150);
    material = new THREE.MeshBasicMaterial({color: 0xFF0000, wireframe: true});
    sphere = new THREE.Mesh(geometry, material);
    sphere.name = "sphere";
    scene.add(sphere);

    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);

    render();
  }

  function render() {
    sphere.rotation.y += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(render);

    stats.update();
  }

  return {
    scene: scene,
    sphere: sphere
  };
})();
