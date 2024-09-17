"use client";
import React from 'react'

import BackButton from '@/components/BackButton'
import FadeIn from '@/components/FadeIn'
import Link from '@/components/Link'

const Sketches = [
  {
    name: "Shifting Cubes",
    img: "/images/shiftingcubes.jpg",
    url: "/playground/shiftingcubes",    
    desc: "Cubes made using a slice and divide function which move with time."
  },
  {
    name: "Simplex Tunnel",
    img: "/images/simplextunnel.jpg",
    url: "/playground/simplextunnel",
    desc: "Cubes in a cyclindical pattern which move using 4D simplex noise."
  },
  {
    name: "Perlin Particles",
    img: "/images/perlinparticles.jpg",
    url: "/playground/perlinparticles",
    desc: "Spheres which utilize perlin noise to create a flow field."
  }
]


const Page = () => {
  return (
    <>
    <BackButton />
    <div className="flex pt-24 md:pt-16 px-4 justify-center items-center">
      <p className="text-lg text-gray-300 text-center">
        A collection of Three.js scenes I made inspired by <a href="https://www.gleec.com/" className="text-blue-500 underline">gleec.com</a>
      </p>
    </div>
    <div className="flex h-full pb-12 md:pb-6 py-6 items-center justify-center gap-12 flex-wrap">
      {
        Sketches.map((sketch, index) => (
          <FadeIn delay={(index+1)*100} key={index} className="flex items-center justify-center w-[90%] md:w-[45%] portfolioItem">
            <Link href={sketch.url} className="w-full">
              <div className="relative w-full h-[250px] md:h-[350px] border-[1px] border-[#e5e7eb] border-opacity-50 rounded-lg bg-[#141414] shadow-lg">
                <div
                  className="absolute bg-cover bg-center w-full h-full opacity-60 rounded-lg brightness-200"
                  style={{ 
                    backgroundImage: `url(${sketch.img})`,   
                }}
                />       
                <div className={`absolute text-white w-full h-full flex justify-center items-center`}>                
                  <div className="relative z-10 flex flex-col justify-center items-center">
                    <h3 className="text-3xl font-bold">{sketch.name}</h3>
                    <p className="text-md text-gray-200 p-2 text-center">{sketch.desc}</p>
                  </div>
                </div>
              </div>
            </Link>
          </FadeIn>
        ))
      }
    </div>    
    </>
  )
}

export default Page;