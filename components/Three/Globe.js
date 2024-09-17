'use client';
import React, { useState, useEffect, useRef } from 'react';

import { TextureLoader } from 'three';
import { Canvas, useLoader, extend, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei'
import { a } from '@react-spring/three';

import geojson from "./countries.js";
import CountryBufferGeometry from './CountryBufferGeometry';

extend({ CountryBufferGeometry });

const countriesVisited = [
  "Ireland",
  "France",
  "Belgium",
  "Netherlands",
  "Germany",
  "Poland",
  "Czechia",
  "Austria",
  "Italy",
  "Switzerland",
  "Spain",
  "Portugal",
  "Egypt",
  "Greece",
  "Croatia",
  "Thailand",
  "Lao PDR",
  "Vietnam",
  "Malaysia",
  "Singapore",
  "United States",
  "United Kingdom",
  "Cyprus",
];

const COLORS = [
  "#FF0000",  // Pure Red
  "#FF1A1A",  // Light Red
  "#E60000",  // Crimson
  "#CC0000",  // Dark Red
  "#FF3333",  // Soft Red
  "#B30000",  // Deep Red
  "#FF4D4D",  // Coral Red
  "#990000",  // Burgundy
  "#FF6666",  // Pinkish Red
  "#800000",  // Maroon
  "#FF8080",  // Salmon Red
  "#660000",  // Dark Burgundy
  "#FF9999",  // Pale Red
  "#4D0000",  // Very Dark Red
  "#FFB3B3",  // Pastel Red
  "#330000",  // Near Black Red
  "#FFCCCC",  // Light Pinkish Red
  "#990033",  // Wine Red
  "#FF0066",  // Bright Rose Red
  "#CC0033"   // Ruby Red
]



//Countries

// Process geojson data
const countriesData = [];
Object.keys(geojson).forEach((region) => {
  geojson[region].forEach((country) => {
    countriesVisited.forEach((match) => {
      if (country.id === match){
        countriesData.push(country);
      }
    })    
  });
});

//Country class
const Country = ({ coordinates, color, id, onClick }) => {    

  const geometry = useRef();
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    if (!geometry.current) return;
    geometry.current.setCoordinates(coordinates);
  }, [geometry, coordinates]);
  
  return (              
    <mesh>
      <countryBufferGeometry ref={geometry} />      
      <meshStandardMaterial color={color} onPointerOver={() => console.log(id)}/>                  
    </mesh>
  );
};


export default function Earth( {playing} ) {
  const scene = useRef(null);

  const [color, normal, aoMap] = useLoader(TextureLoader, ['/assets/earth_day.jpg', '/assets/earth_normal.png', '/assets/occlusion.jpg']);    

  const Earth = ({ children }) => {
    const globe = useRef(null);
    const earth = useRef(null);

    useFrame(({ clock }) => {
      const a = clock.getElapsedTime();
      if (globe.current && playing) {
        globe.current.rotation.y = -clock.getElapsedTime()/8;     
      } 
    })

    return (
      <a.group 
        ref={globe}
        scale={2}
      >
        <mesh
          ref={earth}
          >                              
            <sphereGeometry args={[0.995, 64, 64]} />
            <meshStandardMaterial
              map={color}
              normalMap={normal}          
            />                
        </mesh>
        {children}
      </a.group>
    )    
  }

  return (
    <>
    <Canvas ref={scene} mode="concurrent">
      <ambientLight intensity={3.5} />      

      <Earth>
        {countriesData.map((country, i) => (
            <Country
              key={i}
              coordinates={country.geometry.coordinates}
              color={COLORS[i % COLORS.length]}
            />
          ))}
      </Earth>
      
      <Stars />

      <OrbitControls />
    </Canvas>
    <div className="absolute bg-black bg-opacity-50 border-[2px] border-[#fff]">      
    </div>
    </>
  );
}