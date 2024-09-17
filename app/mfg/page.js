"use client";
import React from 'react'
import { useRouter } from 'next/navigation'

const page = () => {

  const router = useRouter();

  const handleBack = () => {    
    router.push('/portfolio/');
  }

  return (
    <>
    <button 
      onClick={handleBack} 
      className="absolute bg-[#141414] border-[2px] border-[#303030] text-gray-200 rounded-lg m-6 px-5 py-2 hover:text-white hover:bg-[#303030]"
    >
      Back
    </button>
    <div className="flex min-h-screen justify-center items-center">
      <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/VKUD1KQRCBA?si=he8ESLep0I2tF2JH" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen
      />
    </div>
    </>
  )
}

export default page
