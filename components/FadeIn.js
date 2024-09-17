"use client";
import React, { useEffect, useState } from 'react'

const FadeIn = ( { children, className, delay = 0} ) => {

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  });

  return (
    <div
      className={`fadeInComponent delay-[${delay}] transition-all ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
       ${className}`}
    >
      {children}      
    </div>
  )
}

export default FadeIn
