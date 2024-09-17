"use client";
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Dynamically import the Sketch class that handles the Three.js scene.
const Sketch = dynamic(() => import('./shiftingcubes.js'), { ssr: false });

const Page = () => {
  
  const router = useRouter();

  const handleBack = () => {
    let destination = '/playground';
    router.push(destination);
  }

  const [cleanup, setCleanup] = useState(false);

  const handleCleanup = () => {
    setCleanup(true);
  }


  return (
    <>
    <button 
      onClick={handleCleanup}
      className="absolute bg-[#141414] border-[2px] border-[#303030] text-gray-200 rounded-lg m-6 px-5 py-2 hover:text-white hover:bg-[#303030]"
    >
      Back
    </button>
      <Sketch 
        cleanup={cleanup} 
        handleBack={handleBack}
      />      
    </>
  );
};

export default Page;