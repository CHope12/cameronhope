"use client";
import React from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

const BackButton = () => {  
  const router = useRouter();

  const handleBack = () => {    
    router.push('/');
  }

  return (
    <button 
      onClick={handleBack} 
      className="absolute bg-[#141414] border-[2px] border-[#303030] text-gray-200 rounded-lg m-6 px-5 py-2 hover:text-white hover:bg-[#303030]"
    >
      Back
    </button>
  )
}

export default BackButton
