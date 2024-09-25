"use client";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import React, { useRef, useEffect, useState } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import GUI from 'lil-gui';

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
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio / 1.5));
    this.renderer.setSize( this.width / this.height);
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.physicallyCorrectLights = true;
    //this.renderer.outputEncoding = THREE.sRGBEncoding;
    
    //Append to HTML
    options.dom.appendChild(this.renderer.domElement);

    //Camera
    this.camera = new THREE.PerspectiveCamera( 
      90, 
      window.innerWidth / window.innerHeight, 
      0.1,
      4000 
    );    

    this.scene.add(this.camera);

    //Orbit controls
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );

    this.camera.position.set(268, 294, 724);
    this.camera.rotation.set(-1.287, -0.311, -0.81)

    //this.scene.add(new THREE.GridHelper);

    this.light = new THREE.PointLight( 0xffffff, 2, 0, 0 );
    this.light.position.set( 500, 1000, 500);
    this.scene.add( this.light );

    this.light = new THREE.PointLight( 0xffffff, 1, 0, 0 );
    this.light.position.set( 500, 100, 0);
    this.scene.add( this.light );

    this.light = new THREE.AmbientLight( 0xffffff, 50000);
    this.scene.add( this.light );

    //Loader
    this.loader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderConfig({ type: 'js' });
    this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    this.loader.setDRACOLoader(this.dracoLoader);

    //Cube
    this.grid = new THREE.Object3D();
    this.cubes = []

    this.material = {
      color: 0xffffff,
      emissive: 0x000000,
      roughness: 0.45,
      metalness: 1,
      transparent: true,
      flatShading: true,
      //reflectivity: 0,
      //clearcoat: 1,
      //clearcoatRoughness: 1,
      //shininess: 100,
    }

    this.formMaterial = {

    }

    /******** Slice/Divide  ********/

    // Dimensions
    this.dimx = 1000;
    this.dimy = 1000;

    // Parameters
    this.minDepth = 8;
    this.maxDepth = 10;
    this.divProb = 0.4;
    this.splitUniformity = 0.15;
    this.balance = 0.5;
    this.towardsCenter = 0.0;
    this.hueJitter = 20;
    this.satJitter = 5;
    this.valJitter = 5;
    this.colorByArea = 0;

    // Global Variables
    //this.colorPaletteHex = ["2D033B", "810CA8", "C147E9", "531253", "852999", "C539B4"];
    this.color1 = "#2D033B";
    this.color2 = "#810CA8";
    this.color3 = "#C147E9";
    this.color4 = "#531253";
    this.color5 = "#852999";
    this.color6 = "#C539B4";
    this.colorPaletteHex = [this.color1.slice(1), this.color2.slice(1), this.color3.slice(1), this.color4.slice(1), this.color5.slice(1), this.color6.slice(1)];
    this.bools = [true, false];
    this.divPt = [this.dimx/2, this.dimy/2]; // [500, 500]
    this.cornerDist = Math.sqrt( Math.pow(this.divPt[0], 2) + Math.pow(this.divPt[1], 2) );

    //this.colours();

    this.sliceDivide(0, 0, 0, this.dimy, this.dimx, this.dimy, this.dimx, 0, this.maxDepth, 1, true);

    this.scene.add(this.grid);
    this.xOrY = Math.round(Math.random()) ? 1 : -1; //Rand bool
    this.movingForwardX = true;
    this.movingForwardY = true;

    //Scale
    this.scaleAmount = 0.000075;
    this.scaleForward = true;

    //Options
    this.gui = new GUI();
    const dimensions = this.gui.addFolder('Dimensions');
    dimensions.add(this, 'dimx', 100, 1000).step(1).name('Width').onChange(() => {
      this.restart();
    });
    dimensions.add(this, 'dimy', 100, 1000).step(1).name('Height').onChange(() => {
      this.restart();
    });
    const parameters = this.gui.addFolder('Parameters');
    parameters.add(this, 'minDepth', 1, 10).step(1).name('Min Depth').onChange(() => {
      this.restart();
    });
    parameters.add(this, 'maxDepth', 1, 10).step(1).name('Max Depth').onChange(() => {
      this.restart();
    });
    parameters.add(this, 'divProb', 0, 1).step(0.01).name('Divide Probability').onChange(() => {
      this.restart();
    });
    parameters.add(this, 'splitUniformity', 0, 1).step(0.01).name('Split Uniformity').onChange(() => {
      this.restart();
    });
    parameters.add(this, 'balance', 0, 1).step(0.01).name('Balance').onChange(() => {
      this.restart();
    });
    parameters.add(this, 'towardsCenter', 0, 1).step(0.01).name('Towards Center').onChange(() => {
      this.restart();
    });
    parameters.add(this, 'hueJitter', 0, 100).step(1).name('Hue Jitter').onChange(() => {
      this.restart();
    });
    parameters.add(this, 'satJitter', 0, 100).step(1).name('Saturation Jitter').onChange(() => {
      this.restart();
    });
    parameters.add(this, 'valJitter', 0, 100).step(1).name('Value Jitter').onChange(() => {
      this.restart();
    });
    parameters.add(this, 'colorByArea', 0, 1).step(1).name('Color By Area').onChange(() => {
      this.restart();
    });
    const colours = this.gui.addFolder('Colours');
    colours.addColor(this, 'color1').name('Color 1').onChange(() => {            
      this.colorPaletteHex = [this.color1.slice(1), this.color2.slice(1), this.color3.slice(1), this.color4.slice(1), this.color5.slice(1), this.color6.slice(1)];
      this.restart();
    });
    colours.addColor(this, 'color2').name('Color 2').onChange(() => {
      this.colorPaletteHex = [this.color1.slice(1), this.color2.slice(1), this.color3.slice(1), this.color4.slice(1), this.color5.slice(1), this.color6.slice(1)];
      this.restart();
    });
    colours.addColor(this, 'color3').name('Color 3').onChange(() => {
      this.colorPaletteHex = [this.color1.slice(1), this.color2.slice(1), this.color3.slice(1), this.color4.slice(1), this.color5.slice(1), this.color6.slice(1)];
      this.restart();
    });
    colours.addColor(this, 'color4').name('Color 4').onChange(() => {
      this.colorPaletteHex = [this.color1.slice(1), this.color2.slice(1), this.color3.slice(1), this.color4.slice(1), this.color5.slice(1), this.color6.slice(1)];
      this.restart();
    });
    colours.addColor(this, 'color5').name('Color 5').onChange(() => {
      this.colorPaletteHex = [this.color1.slice(1), this.color2.slice(1), this.color3.slice(1), this.color4.slice(1), this.color5.slice(1), this.color6.slice(1)];
      this.restart();
    });
    colours.addColor(this, 'color6').name('Color 6').onChange(() => {
      this.colorPaletteHex = [this.color1.slice(1), this.color2.slice(1), this.color3.slice(1), this.color4.slice(1), this.color5.slice(1), this.color6.slice(1)];
      this.restart();
    });
    const scale = this.gui.addFolder('Scale');
    scale.add(this, 'scaleAmount', 0.00001, 0.1).step(0.001).name('Scale Amount');
    scale.add(this, 'scaleForward').name('Scale Forward');
    const restart = this.gui.addFolder('Restart');
    restart.add(this, 'restart');
    this.gui.close();

    //Resize
    this.setupResize();
    this.resize();
    //Render
    this.isPlaying = true;
    this.iteration = 0;
    this.render();
  }

  loadModel(url){
    return new Promise(resolve => {
      this.loader.load(url, resolve);
    })
  }

  /*
  colours(){
    this.colorPaletteHex = [this.color1, this.color2, this.color3, this.color4, this.color5, this.color6];
    console.log(this.colorPaletteHex);
  }
  */

  createRect(a1, a2, a3, a4, a5, a6, a7, a8) {
    var width = Math.abs(a5 - a1);
    var length = Math.abs(a6 - a2);
    var xPos = (a1 + a5)/2;
    var zPos = (a2 + a6)/2;
    var yPos = Math.floor(Math.random()*50 + 15); // this will get a number between 25 and 49;
    yPos *= Math.round(Math.random()) ? 1 : -1; //- 50%
    var moveSpeed = Math.floor(Math.random()*40 + 2) / 1000;

    var geo = new THREE.BoxGeometry(width, 100, length);
    var mat = new THREE.MeshBasicMaterial( 0xffffff );
    var colour = new THREE.Color();
    colour.setHex(`0x${this.colorPaletteHex[Math.floor(Math.random() * this.colorPaletteHex.length)]}`);
    this.material.color = colour;
    var mat = new THREE.MeshStandardMaterial(this.material);
    //var mat = new THREE.MeshLambertMaterial({ color: colour });
    var cube = new THREE.Mesh(geo, mat);
    cube.position.set(xPos, 0, zPos);
    cube.yPos = yPos;
    cube.moveSpeed = moveSpeed;
    cube.startOffset = Math.floor(Math.random()*200);

    this.cubes.push(cube);
	  this.grid.add(cube);
}

  sliceDivide(x1, y1, x2, y2, x3, y3, x4, y4, depth, base, horizontal) {
    if (depth == base) {
      this.createRect(x1, y1, x2, y2, x3, y3, x4, y4);
    } else {
      let randValHor = y1 + (y2 - y1) * Math.random(1.0) * (1 - this.splitUniformity) + (y2 - y1) / 2 * this.splitUniformity;
      let randValVer = x1 + (x4 - x1) * Math.random(1.0) * (1 - this.splitUniformity) + (x4 - x1) / 2 * this.splitUniformity;
      // horizontal split points
      let nx12 = (x1 + x2) / 2;
      let ny12 = randValHor;
      let nx34 = (x3 + x4) / 2;
      let ny34 = randValHor;
      // vertical split points
      let nx14 = randValVer;
      let ny14 = (y1 + y4) / 2;
      let nx23 = randValVer;
      let ny23 = (y2 + y3) / 2;
      // ternary assignments
      let a1 = x1;
      let a2 = y1;
      let a3 = (horizontal ? nx12 : x2);
      let a4 = (horizontal ? ny12 : y2);
      let a5 = (horizontal ? nx34 : nx23);
      let a6 = (horizontal ? ny34 : ny23);
      let a7 = (horizontal ? x4 : nx14);
      let a8 = (horizontal ? y4 : ny14);
      let b1 = (horizontal ? x2 : nx14);
      let b2 = (horizontal ? y2 : ny14);
      let b3 = (horizontal ? nx12 : nx23);
      let b4 = (horizontal ? ny12 : ny23);
      let b5 = (horizontal ? nx34 : x3);
      let b6 = (horizontal ? ny34 : y3);
      let b7 = (horizontal ? x3 : x4);
      let b8 = (horizontal ? y3 : y4);
  
      // center pt
      let center_aX = (a1 + a3)/2;
      let center_aY = (a2 + a4)/2;
      let center_bX = (b1 + b3)/2;
      let center_bY = (b2 + b4)/2;
      let dist_a = Math.sqrt( Math.pow(center_aX - this.divPt[0], 2) + Math.pow(center_aY - this.divPt[1], 2) );
      let dist_b = Math.sqrt( Math.pow(center_bX - this.divPt[0], 2) + Math.pow(center_bY - this.divPt[1], 2) );
  
      // Determine which way to split
      let r1horwider = (Math.abs(a5 - a1) > Math.abs(a6 - a2) ? false : true); // boolean for "is wider horizontally"
      let r2horwider = (Math.abs(b5 - b1) > Math.abs(b6 - b2) ? false : true);
      let r1hor = (Math.random(1.0) > 1-this.balance ? r1horwider : this.bools[Math.floor(Math.random()*2)]); // divide by wider or random
      let r2hor = (Math.random(1.0) > 1-this.balance ? r2horwider : this.bools[Math.floor(Math.random()*2)]);
  
      // Recursive calls or make and display rectangles
      let prob_a = this.towardsCenter*dist_a/this.cornerDist + (1-this.towardsCenter)*(1-this.divProb);
      let prob_b = this.towardsCenter*dist_b/this.cornerDist + (1-this.towardsCenter)*(1-this.divProb);
      let toDivide1 = (depth < this.maxDepth - this.minDepth ? Math.random(1.0) : 1.0); // 1 if less than min depth
      if (toDivide1 > prob_a) { // 0.2
        this.sliceDivide(a1, a2, a3, a4, a5, a6, a7, a8, depth - 1, base, r1hor);
      } else {
        this.createRect(a1, a2, a3, a4, a5, a6, a7, a8);
      }
      
      let toDivide2 = (depth < this.maxDepth - this.minDepth ? Math.random(1.0) : 1.0);
      if (toDivide2 > prob_b) {
        this.sliceDivide(b1, b2, b3, b4, b5, b6, b7, b8, depth - 1, base, r2hor);
      } else {
        this.createRect(b1, b2, b3, b4, b5, b6, b7, b8);
      }
    }
  }

  updateShapes(){
    //Grid
    var xScale = this.grid.scale.x;
    if (this.scaleForward){
      if (xScale < 2){
        this.grid.scale.set(this.grid.scale.x * (1 + this.scaleAmount), 1, 1);
      } 
      else {
        this.scaleForward = false;
      }
    }
    else {
      if (xScale > 1){
        this.grid.scale.set(this.grid.scale.x * (1 - this.scaleAmount), 1, 1);
      } 
      else {
        this.scaleForward = true;
      }
    }

    this.iteration++;
    //Cubes
    for(let i = 0; i < this.cubes.length; i++){
      if (this.cubes.startOffset > this.iteration){
        return;
      }
      if (this.cubes[i].yPos > 0){
        if (this.cubes[i].position.y < this.cubes[i].yPos){
          this.cubes[i].position.y += this.cubes[i].moveSpeed;   //set different speeds
          //this.cubes[i].material.opacity += 0.002;
        }
        else {
          this.cubes[i].yPos = -this.cubes[i].yPos;
        }
      }
      else {
        if (this.cubes[i].position.y > this.cubes[i].yPos){
          this.cubes[i].position.y -= this.cubes[i].moveSpeed;
          //this.cubes[i].material.opacity -= 0.002;
        }
        else{
          this.cubes[i].yPos = -this.cubes[i].yPos;
        }
      }
  }
  }


  restart(){
    this.grid.children = [];
    this.cubes = [];
    this.sliceDivide(0, 0, 0, this.dimy, this.dimx, this.dimy, this.dimx, 0, this.maxDepth, 1, true);
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
    } else {
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio / 1.5));
    }
    this.camera.updateProjectionMatrix();
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
    if(!this.isPlaying){
      return;
    }
    window.requestAnimationFrame(this.render.bind(this));
    this.updateShapes();
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