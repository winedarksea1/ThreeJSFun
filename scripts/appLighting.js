var context = (function () {
  "use strict";

  window.onload = initScene;
  window.onkeydown = checkKey;

  var scene = new THREE.Scene();
  var light;
  var camera;
  var renderer = new THREE.WebGLRenderer();
  var cubeGeometry;
  var cubeMaterial;
  var cube;
  var planeGeometry;
  var planeMaterial;
  var plane;
  var loader = new THREE.TextureLoader();

  function initScene () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    document.getElementById("webgl-container").appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    camera.position.z = 300;
    camera.position.y = 20;

    scene.add(camera);

    loader.load("textures/black-lodge.jpg", function (texture) {
      planeGeometry = new THREE.PlaneGeometry(200, 200);
      planeMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0x003344,
        shininess: 100,
        flatShading: THREE.FlatShading,
        side: THREE.DoubleSide,
        map: texture
      });
      plane = new THREE.Mesh(planeGeometry, planeMaterial);

      plane.rotation.x = 90 * (Math.PI / 180);
      plane.position.y = -10;

      plane.name = "plane";
      plane.recieveShadow = true;

      scene.add(plane);
    });

    // planeGeometry = new THREE.PlaneGeometry(200, 200);
    // planeMaterial = new THREE.MeshPhongMaterial({
    //   color: 0x0088aa,
    //   specular: 0x003344,
    //   shininess: 100,
    //   flatShading: THREE.FlatShading,
    //   side: THREE.DoubleSide
    // });
    // plane = new THREE.Mesh(planeGeometry, planeMaterial);
    //
    // plane.rotation.x = 90 * (Math.PI / 180);
    // plane.position.y = -10;
    //
    // plane.name = "plane";
    // plane.recieveShadow = true;
    //
    // scene.add(plane);

    light = new THREE.DirectionalLight(new THREE.Color("#ffffff"));
    light.position.set(0, 50, 0);
    light.castShadow = true;

    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    scene.add(light);


    // cubeGeometry = new THREE.BoxGeometry(20, 20, 20);
    // cubeMaterial = new THREE.MeshLambertMaterial({
    //   color: 0xffffff,
    // });
    // cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // cube.position.y = 10;
    // cube.name = "cube";
    // cube.castShadow = true;
    //
    // scene.add(cube);

    loader.load('textures/velvet.jpg', function ( texture ) {
      console.log("Cube was loaded!!");
      cubeGeometry = new THREE.BoxGeometry(20, 20, 20);
      cubeMaterial = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5, color: 0xffffff});
      cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.y = 10;
      cube.name = "cube";
      cube.castShadow = true;
      scene.add(cube);
    });

    render();
  }

  function checkKey(e) {
    e.preventDefault();
    var left = 37;
    var up = 38;
    var right = 39;
    var down = 40;
    var increment = 10;

    e = e || window.event;

    if (e.keyCode == up) {
      camera.position.z -= increment;
    } else if (e.keyCode == down) {
      camera.position.z += increment;
    } else if (e.keyCode == left) {
      camera.position.x -= increment;
    } else if (e.keyCode == right) {
      camera.position.x += increment;
    }
  }

  function render () {
    // texture loading is async, so we do a check here
    if (cube) {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    }
    //
    // if (camera.position.z > 170) {
    //   camera.position.z -=1;
    // }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  return {
    scene: scene,
    plane: plane,
    cube: cube
  };

})();
