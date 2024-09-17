import React from 'react'
import Image from "next/image";
import useEmblaCarousel from 'embla-carousel-react'
import { useState, useEffect, useCallback } from "react";
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';


const Carousel = ({ srcs }) => {

  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay(), Fade()])

  return (
    <div className="embla w-full h-full overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex w-full h-full">
        {srcs.map((src, index) => (
          <div className="embla__slide relative" key={index}>
            <Image 
              src={src}
              alt={"Gallery Image" + index}
              priority={index == 0 ? true : false}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-lg absolute"
            />
          </div>
        ))}        
      </div>
    </div>
  )
}

export default Carousel
