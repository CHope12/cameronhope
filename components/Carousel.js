import React from 'react'
import Image from "next/image";
import useEmblaCarousel from 'embla-carousel-react'
import { useState, useEffect, useCallback } from "react";
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';

const image1 = "/images/about1.jpg";
const image2 = "/images/about2.jpg";
const image3 = "/images/about3.jpg";
const image4 = "/images/about4.jpg";
const image5 = "/images/about5.jpg";
const image6 = "/images/about6.jpg";
const image7 = "/images/about7.jpg";
const image8 = "/images/about8.jpg";
const image9 = "/images/about9.jpg";
const image10 = "/images/about10.jpg";

//Gallery
const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10
];

function BlurImage({ src, alt, ...props }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      priority
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"            
      className={`object-cover rounded-lg absolute ${isLoading ? 'grayscale blur-2xl' : 'grayscale-0 blur-0'}`}
      onLoad={() => setLoading(false)}
    />
  );
}

const Carousel = () => {

  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay(), Fade()])

  return (
    <div className="embla w-full h-full overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex w-full h-full">
        {images.map((src, index) => (
          <div className="embla__slide relative" key={index}>
            {/*
            <Image 
              src={src}
              alt={"Gallery Image" + index}
              placeholder="blur"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-lg absolute"
            />
            */}
            <BlurImage src={src} alt={"Gallery Image" + index} />
          </div>
        ))}        
      </div>
    </div>
  )
}

export default Carousel
