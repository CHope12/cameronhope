"use client";
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import GUI from 'lil-gui';

/* Noise */

const PERLIN_YWRAPB = 4;
const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
const PERLIN_ZWRAPB = 8;
const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
const PERLIN_SIZE = 4095;

let perlin_octaves = 4; // default to medium smooth
let perlin_amp_falloff = 0.5; // 50% reduction/octave

const scaled_cosine = i => 0.5 * (1.0 - Math.cos(i * Math.PI));

let perlin; // will be initialized lazily by noise() or noiseSeed()

function noise(x, y = 0, z = 0) {
  if (perlin == null) {
    perlin = new Array(PERLIN_SIZE + 1);
    for (let i = 0; i < PERLIN_SIZE + 1; i++) {
      perlin[i] = Math.random();
    }
  }

  if (x < 0) {
    x = -x;
  }
  if (y < 0) {
    y = -y;
  }
  if (z < 0) {
    z = -z;
  }

  let xi = Math.floor(x),
    yi = Math.floor(y),
    zi = Math.floor(z);
  let xf = x - xi;
  let yf = y - yi;
  let zf = z - zi;
  let rxf, ryf;

  let r = 0;
  let ampl = 0.5;

  let n1, n2, n3;

  for (let o = 0; o < perlin_octaves; o++) {
    let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

    rxf = scaled_cosine(xf);
    ryf = scaled_cosine(yf);

    n1 = perlin[of & PERLIN_SIZE];
    n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1);
    n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
    n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
    n1 += ryf * (n2 - n1);

    of += PERLIN_ZWRAP;
    n2 = perlin[of & PERLIN_SIZE];
    n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2);
    n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
    n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
    n2 += ryf * (n3 - n2);

    n1 += scaled_cosine(zf) * (n2 - n1);

    r += n1 * ampl;
    ampl *= perlin_amp_falloff;
    xi <<= 1;
    xf *= 2;
    yi <<= 1;
    yf *= 2;
    zi <<= 1;
    zf *= 2;

    if (xf >= 1.0) {
      xi++;
      xf--;
    }
    if (yf >= 1.0) {
      yi++;
      yf--;
    }
    if (zf >= 1.0) {
      zi++;
      zf--;
    }
  }
  return r;
};

/* Particle */

class Particle{
  constructor(x,y,z){
  this.pos = new THREE.Vector3(x,y,z);
  this.vel = new THREE.Vector3(0,0,0);
  this.acc = new THREE.Vector3(0,0,0);
  this.angle = new THREE.Euler(0,0,0);
  this.mesh = null;
  }
}

/* Setup */

class Sketch{
  constructor(options){

    //Flow Field
      this.size = 48;
      this.noiseScale = 0.1;
      this.noiseSpeed = 0.005;
      this.noiseStrength = 0.1;
      this.noiseFreeze = false;

    //Particles
      this.particleCount = 1000;
      this.particleSize = 0.22;
      this.particleSpeed = 0.05;
      this.particleDrag = 0.9;

      //0x2799D4, //0x26CDC7, //0x02151B
      this.particleColor = 0x41a5ff; //0x41a5ff, //0xff6728 
      this.particleColor1 = 0x2799D4;
      this.particleColor2 = 0x26CDC7;
      this.particleColor3 = 0x02151B;

      //this.bgColor = 0x000000;
      this.particleBlending = THREE.AdditiveBlending;
    
    this.scene = new THREE.Scene();

    //Options
    this.gui = new GUI();
    const flowField = this.gui.addFolder('Flow Field');
    flowField.add(this, 'size', 1, 100);
    flowField.add(this, 'noiseScale', 0.01, 0.5);
    flowField.add(this, 'noiseSpeed', 0.001, 0.01);
    flowField.add(this, 'noiseStrength', 0.01, 0.5);
    flowField.add(this, 'noiseFreeze');
    flowField.open();
    const particlesFolder = this.gui.addFolder('Particles');
    particlesFolder.add(this, 'particleCount', 1, 5000);
    particlesFolder.add(this, 'particleSize', 0.01, 1);
    particlesFolder.add(this, 'particleSpeed', 0.001, 0.1);
    particlesFolder.add(this, 'particleDrag', 0.8, 1);
    particlesFolder.addColor(this, 'particleColor');
    particlesFolder.addColor(this, 'particleColor1');
    particlesFolder.addColor(this, 'particleColor2');
    particlesFolder.addColor(this, 'particleColor3');
    this.gui.close();

    //Renderer
    this.container = options.dom;
    this.width = this.container.width;
    this.height = this.container.height;
    this.renderer = new THREE.WebGLRenderer( {antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio));
    this.renderer.setSize( window.innerWidth, window.innerHeight );
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

    this.camera.position.set(35, 35, 35);
    this.scene.add(this.camera);
    //this.container.addEventListener( 'mousemove', onMouseMove, false );

    //Light
    //this.light = new THREE.PointLight( 0xfff, 50, 100 );
    //this.light.position.set( 25, 25, 25 );
    //this.scene.add( this.light );

    /* Fog
    this.fogColor = new THREE.Color(0x0F0F0F);
    this.scene.background = this.fogColor; // Setting fogColor as the background color also
    this.scene.fog = new THREE.Fog(this.fogColor, 0, 15);
    */
    

    //Append to HTML
    options.dom.appendChild(this.renderer.domElement);
    
    //Particles
    this.particles = [];

    this.material = new THREE.PointsMaterial({
      color: this.particleColor,
      size: this.particleSize,
      sizeAttenuation: true,      
    });

    this.material1 = new THREE.PointsMaterial({
      color: this.particleColor1,
      size: this.particleSize,
      sizeAttenuation: true,
    });

    this.material2 = new THREE.PointsMaterial({
      color: this.particleColor2,
      size: this.particleSize,
      sizeAttenuation: true,
    });

    this.material3 = new THREE.PointsMaterial({
      color: this.particleColor3,
      size: this.particleSize,
      sizeAttenuation: true,
    });

    this.frameCount = 0;
    this.gridIndex = 0;
    this.noise = 0;
    this.noiseOffset = Math.random()*100;
    this.numParticlesOffset = 0;
    this.p = null

    
    //Orbit controls
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );

    //Resize
    this.setupResize();
    this.resize();
    //Render
    this.isPlaying = true;
    this.render();
  }

  ParticleInit(p) {
    var colorInt = Math.floor(Math.random() * 3);
    var mat = this.material1;
    if (colorInt == 1){
      mat = this.material2;
    }
    if (colorInt == 2){
      var mat = this.material3;
    }

    let radius = Math.random() * (0.15 - 0.075) + 0.075;
    //var geom = new THREE.CircleGeometry( radius, 16 ); 
    var geom = new THREE.SphereGeometry( radius, 4, 4 );

    var point = new THREE.Mesh( geom, mat );
    point.geometry.dynamic = true;
    point.geometry.verticesNeedUpdate = true;
    this.scene.add(point);
    p.mesh = point;
  }
  
  ParticleUpdate(p) {
    p.acc.set(1,1,1);
    p.acc.applyEuler(p.angle);
    p.acc.multiplyScalar(this.noiseStrength);
    
    p.acc.clampLength(0, this.particleSpeed);
    p.vel.clampLength(0, this.particleSpeed);
    
    p.vel.add(p.acc);
    p.pos.add(p.vel);
    
    p.acc.multiplyScalar(this.particleDrag);
    p.vel.multiplyScalar(this.particleDrag);
    
    if(p.pos.x > this.size) p.pos.x = 0 + Math.random();
    if(p.pos.y > this.size) p.pos.y = 0 + Math.random();
    if(p.pos.z > this.size) p.pos.z = 0 + Math.random();
    if(p.pos.x < 0) p.pos.x = this.size - Math.random();
    if(p.pos.y < 0) p.pos.y = this.size - Math.random();
    if(p.pos.z < 0) p.pos.z = this.size - Math.random();
    
    p.mesh.position.set(p.pos.x, p.pos.y, p.pos.z);
  }

  setupResize(){
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize(){
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    //windowHalf.set( this.width / 2, this.height / 2 );

    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.restart();
  }

  restart() {
    for(var i = 0; i < this.particles.length; i++){
      this.scene.remove(this.particles[i].mesh);
    }
    this.particles=[]
  }

  render() {
    if (!this.isPlaying) {
      return;
    }
    //target.x = ( 1 - mouse.x ) * 0.0002;
    //target.y = ( 1 - mouse.y ) * 0.0002;
    
    //this.camera.rotation.x += 0.05 * ( target.y - this.camera.rotation.x );
    //this.camera.rotation.y += 0.05 * ( target.x - this.camera.rotation.y );

    window.requestAnimationFrame(this.render.bind(this));
    // Update particle count
    this.numParticlesOffset = parseInt(this.particleCount - this.particles.length);
    if(this.numParticlesOffset > 0){
      for(var i = 0; i < this.numParticlesOffset; i++){
        var p = new Particle(
          Math.random()*this.size,
          Math.random()*this.size,
          Math.random()*this.size
        );
        this.ParticleInit(p);
        this.particles.push(p);
      }
    } else {
      for(var i = 0; i < -this.numParticlesOffset; i++){
        this.scene.remove(this.particles[i].mesh);
        this.particles[i] = null;
         this.particles.splice(i, 1);
      }
    }
    
    // Update particles based on their coords
    for(var i = 0; i < this.particles.length; i++){
      p = this.particles[i];
      
      this.noise = noise(
        p.pos.x*this.noiseScale,
        p.pos.y*this.noiseScale,
        p.pos.z*this.noiseScale + this.noiseOffset + this.frameCount*this.noiseSpeed
      ) * Math.PI*2;
  
      p.angle.set(this.noise, this.noise, this.noise);
      this.ParticleUpdate(p);
    }
    if(!this.noiseFreeze) this.frameCount++;
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