var example = (function () {
  "use strict";

  window.onload = initScene;

  var scene = new THREE.Scene();
  var renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
  var light = new THREE.AmbientLight(0xffffff);
  var camera;
  var triangle;
  var stats;
  var triangleGeometry;
  var material;
  var manualGeometry;

  function initScene () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("webgl-container").appendChild(renderer.domElement);
    scene.add(light);

    camera = new THREE.PerspectiveCamera(35,
                                        window.innerWidth/window.innerHeight,
                                        1,
                                        1000);
    camera.position.z = 5;
    scene.add(camera);

    material = new THREE.MeshBasicMaterial({
      vertexColors: THREE.VertexColors,
      side: THREE.DoubleSide
    });

    // Create the geometry
    triangleGeometry = new THREE.Geometry();
    triangleGeometry.vertices.push(new THREE.Vector3(0.0, 1.0, 0.0));
    triangleGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
    triangleGeometry.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0));

    triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));

    triangleGeometry.faces[0].vertexColors[0] = new THREE.Color(0xFF0000);
    triangleGeometry.faces[0].vertexColors[1] = new THREE.Color(0x00FF00);
    triangleGeometry.faces[0].vertexColors[2] = new THREE.Color(0xFF0000);

    manualGeometry = new THREE.Mesh(triangleGeometry, material);

    scene.add(manualGeometry);


    // set up Stats
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);

    render();
  }

  function render() {
    manualGeometry.rotation.y += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(render);

    stats.update();
  }

  return {
    scene: scene,
    triangle: manualGeometry
  };
})();
