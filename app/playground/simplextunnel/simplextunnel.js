"use client";
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { simplex3D, simplex4D } from './simplex/simplex.js';

import GUI from 'lil-gui';
import { SimplexNoise } from "three/examples/jsm/math/SimplexNoise.js";

const cubePath = '/models/cube.glb';

class Sketch{
  constructor(options){
    
    this.scene = new THREE.Scene();
    //Renderer
    this.container = options.dom;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer = new THREE.WebGLRenderer( {alpha: true, antialias: true });    
    if (this.width < 768) {
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio / 3));
    }
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio / 2));
    this.renderer.setSize( this.width / this.height);
    this.renderer.setClearColor(0x111111, 1);
    this.renderer.physicallyCorrectLights = true;
    //this.renderer.outputEncoding = THREE.sRGBEncoding;

    //Camera
    this.camera = new THREE.PerspectiveCamera( 
      90, 
      window.innerWidth / window.innerHeight, 
      0.1,
      4000 
    );
    
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    
    //this.camera.lookAt(0,0,0);
    this.camera.position.set(20,-31,5);
    this.camera.rotation.set(2, 0, 2.5)
    //this.camera.lookAt(24,24,24);

    //Append to HTML
    options.dom.appendChild(this.renderer.domElement);

    //Creat lights
    this.light = new THREE.PointLight( 0xffffff, 500 );
    this.light.position.set( -10, 0, -10 );
    //this.scene.add( this.light );

    //Blue
    this.light = new THREE.PointLight( 0x1F51FF, 500 );
    this.light.position.set( 20, 0, 0 );
    this.scene.add( this.light );

    //Green
    this.light = new THREE.PointLight( 0x39FF14, 500 );
    this.light.position.set( 0, 0, 20 );
    this.scene.add( this.light );

    //Purple
    this.light = new THREE.PointLight( 0xBF40BF, 1000);
    this.light.position.set( -10, 0, -10);
    this.scene.add(this.light);

    this.light = new THREE.AmbientLight( 0xffffff, 0.2 );
    this.scene.add( this.light );

    /*Fog
    this.fogColor = new THREE.Color(0x111111);
    this.scene.background = this.fogColor; // Setting fogColor as the background color also
    this.scene.fog = new THREE.Fog(this.fogColor, 30, 90);
    */
    
    //Loader
    this.loader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderConfig({ type: 'js' });
    this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    this.loader.setDRACOLoader(this.dracoLoader);

    this.cubeImport = new THREE.Object3D();

    // Load object
    this.loader.load(cubePath, gltf =>{
      this.loadToScene(gltf.scene.children[0]);
    });

    //Objects
    this.geometry = new THREE.CylinderGeometry( 30, 30, 75, 62, 24, true, 0);
    //083B46
    //042D4C
    //084134

    this.cubeMaterial = {
      color: 0x083B46,
      emissive: 0x000000,      
      reflectivity: 1,
      shininess: 100,
    }

    this.material = new THREE.MeshBasicMaterial( { color: 0xffffff });

    this.o = new THREE.Mesh(this.geometry, this.material);
    this.pos = this.o.geometry.attributes.position;

    this.cubegeometry = new THREE.BoxGeometry( 2, 2, 5 );   

    this.cubes = [],
    this.iteration = 1000,
    this.params = {
    simplexVariation: 0.05,
    simplexAmp: 0.008,
    //opacity: 0.1
    };
    this.speedScale = 2;

    this.gui = new GUI();
    const simplex = this.gui.addFolder('Simplex');
    simplex.add(this.params, 'simplexVariation', 0, 0.1);
    simplex.add(this.params, 'simplexAmp', 0, 0.1);
    const speed = this.gui.addFolder('Speed');
    speed.add(this, 'speedScale', 1, 5);
    /*
    const fog = this.gui.addFolder('Fog');
    fog.add(this.Fog, 'density', 0, 0.1);
    fog.add(this.Fog, 'far', 0, 100);
    fog.add(this.Fog, 'near', 0, 100);
    */
   
    this.gui.close();

    //Resize
    this.setupResize();
    this.resize();
    //Render
    this.isPlaying = true;
    this.render();
  }
  
  createCubes(model){
    this.number = this.geometry.attributes.position.array.length;
    //Create cubes
    for(let i = 0; i < this.number/3; i++){
      this.rand =  Math.floor(Math.random() * 3);
      if (this.rand == 0){
        this.cubeMaterial.color = 0x083B46;
      }
      if (this.rand == 1){
        this.cubeMaterial.color = 0x042D4C;
      }
      if (this.rand == 2){
        this.cubeMaterial.color = 0x084134;
      }
      this.material = new THREE.MeshPhongMaterial(this.cubeMaterial);
      this.v = new THREE.Vector3();
      this.v.fromBufferAttribute(this.pos, i);

      this.localVec = new THREE.Vector3();
      this.localVec = this.o.localToWorld(this.v);


      var cube = model.clone(true);
      cube.material = this.material;
      cube.position.set(this.localVec.x, this.localVec.y, this.localVec.z);
      cube.lookAt(0, this.localVec.y, 0);
      cube.targetVec = new THREE.Vector3(0, cube.position.y, 0);
      cube.moving = false;
      this.cubes.push(cube);
      this.scene.add(cube);
    }
  }

  loadToScene(model){
    model.scale.set(2.5, 2.5, 5)
    this.createCubes(model);
  }

  updateCube(cube){
    if (cube.moving == false){
    }
      cube.targetNormalizedVector = new THREE.Vector3(0,0,0);
      cube.targetNormalizedVector.x = cube.targetVec.x - cube.position.x;
      cube.targetNormalizedVector.y = cube.targetVec.y - cube.position.y;
      cube.targetNormalizedVector.z = cube.targetVec.z - cube.position.z;
      cube.targetNormalizedVector.normalize();

    if (cube.moving == false){
      cube.speed = simplex4D(
        cube.position.x * this.params.simplexVariation,
        cube.position.y * this.params.simplexVariation,
        cube.position.z * this.params.simplexVariation,
        this.iteration / 100
      ) * this.params.simplexAmp;
    }
    if ( (this.iteration % 2000) == 0 ){  //5 sec
      cube.speed = -cube.speed;
    }
    cube.moving = true;

    //cube.translateOnAxis(targetNormalizedVector, speed);
    cube.position.add(cube.targetNormalizedVector.multiplyScalar(cube.speed * this.speedScale));
  }

  setupResize(){
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize(){
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    if (this.width < 768) {
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio / 3));
    }
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio / 2));
    this.camera.updateProjectionMatrix();
    this.render();
  }

  stop(){
    this.isPlaying = false;
  }

  play(){
    if(!this.isPlaying){
      this.isPlaying = true;
    }
    this.render();
  }

  render() {
    if (!this.isPlaying){
      return;
    }
    window.requestAnimationFrame(this.render.bind(this));
    this.iteration++;
    for(let i = 0; i < this.cubes.length; i++){
      this.updateCube(this.cubes[i]);
    }
    this.renderer.render(this.scene, this.camera);
  }

  cleanup() {
    // Cleanup Three.js scene on unmount.
    this.container.removeChild(this.renderer.domElement);
    this.renderer.forceContextLoss();    
  }
}

const Canvas = ({ cleanup, handleBack }) => {
  const containerRef = useRef(null);  
  const [sketch, setSketch] = useState(null);

  useEffect(() => {    
    if (containerRef.current){      
      setSketch(new Sketch({ dom: containerRef.current }));   
    }                          
  }, []);

  useEffect(() => {
    if (cleanup){
      if (sketch !== null){
        sketch.gui.destroy();
        sketch.cleanup();
        setSketch(null);
        handleBack();
      }
    }
  }, [cleanup]);

  return (
    <div ref={containerRef} className="w-[100vw] h-[100vh]"/>
  )
}

export default Canvas;