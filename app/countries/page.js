"use client";
import BackButton from '@/components/BackButton'
import React, { useState } from 'react'

import dynamic from 'next/dynamic';

import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";

//import Globe from '@/components/Three/Globe'
const Globe = dynamic(() => import('@/components/Three/Globe'), { ssr: false });

const page = () => {

  const [playing, setPlaying] = useState(true);

  const handlePlay = () => {
    setPlaying(!playing);
  }

  return (    
    <>    
      <div className="absolute top-0 left-0 w-full h-full min-w-[100svw] min-h-[100svh] overflow-hidden">
        <button className="absolute top-8 right-8 text-white z-10">
        {playing && (
          <FaStop className="w-6 h-6" onClick={handlePlay}/>
        )}          
        {!playing && (
          <FaPlay className="w-6 h-6" onClick={handlePlay}/>
        )}
        </button>
        <Globe className="w-full h-full" playing={playing} />
      </div>
      <BackButton />
    </>
  )
}

export default page;