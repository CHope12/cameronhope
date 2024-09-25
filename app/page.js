"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

import Link from '@/components/Link';
import FadeIn from '@/components/FadeIn';
import Carousel from '@/components/Carousel';
import Me from '@/components/Three/Me';

import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { PiReadCvLogoBold } from "react-icons/pi";
import { MdMailOutline } from "react-icons/md";
import { MdArrowOutward } from "react-icons/md";
import { TbBrandThreejs } from "react-icons/tb";

export default function Home() {

  //Card Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Determine the card under the mouse
      const card = e.target.closest('.card');

      // Remove the effect from all cards
      document.querySelectorAll('.card').forEach(card => {
        card.style.removeProperty('--mouse-x');
        card.style.removeProperty('--mouse-y');
      });

      // Apply the effect to the hovered card
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    const cardsContainer = document.getElementById('cards');
    cardsContainer.addEventListener('mousemove', handleMouseMove);

    return () => {
      cardsContainer.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  //Time
  const [ukTime, setUkTime] = useState('');

  useEffect(() => {
    const formatOptions = {
      timeZone: 'Europe/London',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };

    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-GB', formatOptions);
      const [hour, minute, period] = formatter.formatToParts(now).reduce((acc, part) => {
        if (part.type === 'hour') acc[0] = part.value;
        if (part.type === 'minute') acc[1] = part.value;
        if (part.type === 'dayPeriod') acc[2] = part.value.toUpperCase(); // Convert to uppercase
        return acc;
      }, ['', '', '']);

      setUkTime(`${hour}:${minute} ${period}`);
    };

    updateTime(); // Initial update
    const timer = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  //Color  
  const [tempColor, setTempColor] = useState("rgba(255, 255, 255, 0.06)");
  const [color, setColor] = useState("rgba(255, 255, 255, 0.06)");

  const changeHighlightColor = (color) => {
    setColor(color);    
  };

  const changeTempHighlightColor = (color) => {
    setTempColor(color)
  }

  const checkHighlightColor = () => {
    setTempColor(color);
  }

  useEffect(() => {
    if(tempColor != color){
      document.documentElement.style.setProperty('--hover-color', tempColor);
      
      // Extract RGB from the RGBA color
      const rgbaMatch = tempColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*\d*\.?\d+)?\)$/);
      if (rgbaMatch) {
        const [ , r, g, b ] = rgbaMatch;
        document.documentElement.style.setProperty('--solid-color', `rgb(${r}, ${g}, ${b})`)
      }      
    }
    else {
      document.documentElement.style.setProperty('--hover-color', color)

      // Extract RGB from the RGBA color
      const rgbaMatch = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*\d*\.?\d+)?\)$/);
      if (rgbaMatch) {
        const [ , r, g, b ] = rgbaMatch;
        document.documentElement.style.setProperty('--solid-color', `rgb(${r}, ${g}, ${b})`)
      }      
    }
  }, [color, tempColor])


  //Mobile

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 768);
    }

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  //Loaded

  const [loaded, setLoaded] = useState(false);  

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1500);
  });

  return (    
    <main className="flex justify-center items-center md:px-16 md:py-4">    
    <div className="flex h-full w-full max-w-5xl items-center justify-center">    
      <div id="cards" className="grid h-[150vh] md:h-full md:min-h-[1100px] xl:min-h-[calc(100vh-2rem)] w-full gap-4 p-3 pb-5 md:p-0 md:pb-0 grid-cols-10 grid-rows-15 md:grid-rows-8 rounded-lg">
        <FadeIn className="card col-span-10 md:col-span-7 row-span-4 rounded-lg shadow-md flex items-center justify-center" delay={0}>
          <div className="card-content flex text-white"> 
            <div className="absolute right-0 w-[55%] md:w-1/2 h-full">              
              {loaded && <Me className={`w-full h-full`}/> }
            </div>            
            <div className="absolute flex flex-col p-4 md:p-6 gap-1 w-[60%] md:w-1/2">
              <span className="text-md text-gray-600">Welcome</span>
              <span className="text-[2.9vw] md:text-lg text-gray-300">
                Hi, I'm <span className="text-white font-bold">Cameron Hope</span>, a software developer with focus on developing websites and web applications.
              </span>
              <span className="text-gray-300 text-[2.9vw] md:text-lg">Feel free to reach out to me if you have any projects in mind, or just to say hello.</span>              
            </div>
            <div className="absolute bottom-0 left-0 m-6 flex gap-2 hero-links">
              <a href="https://github.com/CHope12" target="_blank">
                <button className="border-2 rounded-lg px-4 py-2 bg-[#141414] text-white hover:text-black hover:-translate-y-1 ease-in-out duration-300">
                  <FaGithub />
                </button>
              </a>              
              <a href="https://www.linkedin.com/in/cameronhope1/" target="_blank">
                <button className="border-2 rounded-lg px-4 py-2 bg-[#141414] text-white hover:text-black hover:-translate-y-1 ease-in-out duration-300">
                  <FaLinkedin />
                </button>
              </a>              
              <a href="/cv.pdf" target="_blank">
                <button className="border-2 rounded-lg px-4 py-2 bg-[#141414] text-white hover:text-black hover:-translate-y-1 ease-in-out duration-300">
                  <PiReadCvLogoBold />
                </button>
              </a>
              <a href="mailto:cameron@cameronhope.co.uk">
                <button className="border-2 rounded-lg px-4 py-2 bg-[#141414] text-white hover:text-black hover:-translate-y-1 ease-in-out duration-300">
                  <MdMailOutline />
                </button>
              </a>
            </div>                           
          </div>
        </FadeIn>

        <FadeIn className="card col-span-6 md:col-span-3 row-span-5 rounded-lg shadow-md flex items-center justify-center" delay={100}>        
          <div className="card-content flex">
            <div className="flex flex-col py-2 md:py-6 px-2 gap-1">
              <p className="text-white text-md text-gray-700">About me</p>
              <p className="text-[2.9vw] md:text-[1.8vw] lg:text-lg text-gray-300"> Hi, I'm Cameron, a software developer from England.</p>
              <p className="text-[2.9vw] md:text-[1.8vw] lg:text-lg text-gray-300">My primary tools of choice includes:</p>
              <div className="flex flex-col text-[2.9vw] md:text-[1.8vw] lg:text-lg text-gray-300 leading-tight lg:leading-6">
                <span>• JavaScript</span>
                <span>• TypeScript</span>
                <span>• Tailwind CSS</span>                
                <span>• Next.js</span> 
                <span>• C#</span>                         
              </div>
                <p className="text-[2.8vw] md:text-[1.8vw] lg:text-lg text-gray-300">Beyond coding, I'm passionate about video games, working out, and travelling. An unusual hobby of mine is building watches, they're great for expression.</p>
            </div>
          </div>        
        </FadeIn>

      {!mobile && (
        <FadeIn className="card col-span-3 row-span-4 rounded-lg shadow-md flex items-center justify-center" delay={200}>        
          <div className="card-content">   
            <div className="flex flex-col p-6 gap-4">         
              <p className="text-white text-xl font-bold">Let's start working together!</p>
              <div className="flex flex-col">
                <p className="text-gray-600">Contact Details</p>
                <a href="mailto:cameron@cameronhope.co.uk" className="text-gray-300 text-[1.25vw] lg:text-sm italic">cameron@cameronhope.co.uk</a>
                <p className="text-gray-300 text-[1.25vw] lg:text-sm">England</p>   
              </div>                      
              <div className="flex flex-col">
                <p className="text-gray-600">Links</p>
                <a href="https://www.linkedin.com/in/cameronhope1/" target="_blank" className="text-gray-300">LinkedIn</a>
                <a href="https://github.com/CHope12/" target="_blank" className="text-gray-300">GitHub</a>
                <a href="/cv.pdf" target="_blank" className="text-gray-300">CV</a>
              </div>
            </div>
          </div>
        </FadeIn>
      )}

        <FadeIn className="card col-span-4 md:col-span-2 row-span-1 rounded-lg shadow-md flex items-center justify-center" delay={mobile ? 200 : 300}>
          <div className="card-content flex items-center justify-center">
            <p className="text-white text-[4vw] md:text-[1.75vw] lg:text-[1.5vw] xl:text-xl">
              {ukTime} GMT
            </p>
          </div>
        </FadeIn>

        {/* added */}
        {mobile && (
          <FadeIn className="card col-span-4 row-span-2 rounded-lg shadow-md flex items-center justify-center hover:-translate-y-1" delay={300}>
          <Link 
            href="/portfolio"          
            className="card-content flex items-center justify-center">          
              <p className="text-white flex justify-center items-center gap-2 text-[4vw] w-full h-full">Portfolio <MdArrowOutward /></p>          
          </Link>
          </FadeIn>
        )}

        {!mobile && (
        <FadeIn className="card col-span-4 md:col-span-2 row-span-1 rounded-lg shadow-md flex items-center justify-center overflow-hidden hover:-translate-y-1" delay={400}>
        <Link
          href="/playground"
          className="card-content flex items-center justify-center"
            style={{ 
              backgroundImage: "url(/images/perlinparticles.jpg)", 
              backgroundSize: "cover"              
          }}>                              
            <p className="absolute text-white flex justify-center items-center gap-2 w-full h-full text-[1.5vw] lg:text-lg"><TbBrandThreejs />Playground <MdArrowOutward /></p>                                 
        </Link>
        </FadeIn>
        )}

        <FadeIn className="card col-span-4 md:col-span-2 row-span-2 rounded-lg shadow-md flex items-center justify-center" delay={mobile ? 400 : 500}>
          <div className="card-content-no-padding flex items-center justify-center">            
            <Carousel />
          </div>        
        </FadeIn>

        {mobile && (
          <FadeIn className="card col-span-5 md:col-span-2 row-span-1 rounded-lg shadow-md flex items-center justify-center overflow-hidden hover:-translate-y-1" delay={500}>
          <Link
            href="/playground"
            className="card-content flex items-center justify-center"
              style={{ 
                backgroundImage: "url(/images/perlinparticles.jpg)", 
                backgroundSize: "cover"              
            }}>                              
              <p className="absolute text-white flex justify-center items-center gap-2 text-[4vw] w-full h-full"><TbBrandThreejs />Playground <MdArrowOutward /></p>                                 
          </Link>
          </FadeIn>
        )}

        {!mobile && (
          <FadeIn className="card col-span-3 row-span-2  rounded-lg shadow-md flex items-center justify-center hover:-translate-y-1" delay={600}>
          <Link 
            href="/portfolio"          
            className="card-content flex items-center justify-center">          
              <p className="text-white flex justify-center items-center gap-2 text-2xl w-full h-full">Portfolio <MdArrowOutward /></p>          
          </Link>
          </FadeIn>
        )}

        <FadeIn className="card col-span-5 md:col-span-2 row-span-3 md:row-span-2 rounded-lg shadow-md flex items-center justify-center" delay={mobile ? 600 : 700}>
          <div className="card-content-no-padding flex flex-col p-6">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Now</p>          
              <div className="flex justify-center items-center pb-1">
                <div className="bg-green-500 rounded-full w-[9px] h-[9px] md:w-[13.5px] md:h-[13.5px] flex justify-center items-center relative">
                  <div className="absolute bg-green-500 bg-opacity-60 rounded-full w-[15px] h-[15px] md:w-[19px] md:h-[19px] animate-pulse" />
                </div>
              </div>
            </div>            
            <p className="text-gray-400 text-[3.5vw] md:text-[1.25vw] lg:text-sm pt-1">I am currently working as a freelancer making websites and doing home computer repair services</p>            
          </div>        
        </FadeIn>      

        {!mobile && (
        <FadeIn className="card col-span-2 row-span-1 rounded-lg shadow-md flex items-center justify-center" delay={800}>        
          <div className="card-content flex items-center justify-center relative">
            <div className="grid grid-cols-3 w-full h-full gap-1 p-1">
            <button 
              className="flex justify-center items-center hover:-translate-y-0.5 ease-in-out duration-100" 
              onClick={() => changeHighlightColor("rgba(239, 68, 68, 0.06)")}
              onMouseEnter={() => changeTempHighlightColor("rgba(239, 68, 68, 0.06)")}
              onMouseLeave={() => checkHighlightColor()}
            >
              <div className="bg-red-500 rounded-full w-[25px] h-[25px]" />
            </button>
            <button 
              className="flex justify-center items-center hover:-translate-y-0.5 ease-in-out duration-100" 
              onClick={() => changeHighlightColor("rgba(249, 115, 22, 0.06)")}
              onMouseEnter={() => changeTempHighlightColor("rgba(249, 115, 22, 0.06)")}
              onMouseLeave={() => checkHighlightColor()}
              >
              <div className="bg-orange-500 rounded-full w-[25px] h-[25px]" />
            </button>
            <button 
              className="flex justify-center items-center hover:-translate-y-0.5 ease-in-out duration-100" 
              onClick={() => changeHighlightColor("rgba(234, 179, 8, 0.06)")}
              onMouseEnter={() => changeTempHighlightColor("rgba(234, 179, 8, 0.06)")}
              onMouseLeave={() => checkHighlightColor()}
            >
              <div className="bg-yellow-500 rounded-full w-[25px] h-[25px]" />
            </button>
            <button 
              className="flex justify-center items-center hover:-translate-y-0.5 ease-in-out duration-100" 
              onClick={() => changeHighlightColor("rgba(59, 130, 246, 0.06)")}
              onMouseEnter={() => changeTempHighlightColor("rgba(59, 130, 246, 0.06)")}
              onMouseLeave={() => checkHighlightColor()}
            >
              <div className="bg-blue-500 rounded-full w-[25px] h-[25px]" />
            </button>
            <button 
              className="flex justify-center items-center hover:-translate-y-0.5 ease-in-out duration-100" 
              onClick={() => changeHighlightColor("rgba(34, 197, 94, 0.06)")}
              onMouseEnter={() => changeTempHighlightColor("rgba(34, 197, 94, 0.06)")}
              onMouseLeave={() => checkHighlightColor()}
            >
              <div className="bg-green-500 rounded-full w-[25px] h-[25px]" />
            </button>
            <button 
              className="flex justify-center items-center hover:-translate-y-0.5 ease-in-out duration-100" 
              onClick={() => changeHighlightColor("rgba(255, 255, 255, 0.06)")}
              onMouseEnter={() => changeTempHighlightColor("rgba(255, 255, 255, 0.06)")}
              onMouseLeave={() => checkHighlightColor()}
            >
              <div className="bg-white rounded-full w-[25px] h-[25px]" />
            </button>
            </div>
          </div>        
        </FadeIn>
        )}

        <FadeIn className="card col-span-5 md:col-span-3 row-span-1 rounded-lg shadow-md flex items-center justify-center hover:-translate-y-1" delay={mobile ? 700 : 900}>
        <Link
          href="/countries"          
          className="card-content flex items-center justify-center"
          style={{ 
            backgroundImage: "url(/images/planetCropped.png)", 
            backgroundSize: "cover"              
        }}>          
          <p className="absolute p-2 text-[4vw] md:text-[2vw] lg:text-xl flex gap-2 justify-center items-center bg-black bg-opacity-45 w-full h-full text-white">
            Countries I Visited <MdArrowOutward />
          </p>             
        </Link>
        </FadeIn>

        {mobile && (
          <FadeIn className="card col-span-5 row-span-3 rounded-lg shadow-md flex items-center justify-center" delay={800}>        
          <div className="card-content-no-padding p-4 flex">   
            <div className="flex flex-col">         
            <p className="text-white text-md font-bold">Let's start working together!</p>
            <div className="flex flex-col">
              <p className="text-gray-600 text-md">Contact Details</p>
              <a href="mailto:cameron@cameronhope.co.uk" className="text-gray-300 text-[2.75vw] italic">cameron@cameronhope.co.uk</a>
              <p className="text-gray-300 text-[2.75vw]">England</p>   
            </div>
            <div className="flex flex-col">
              <p className="text-gray-600 text-md">Links</p>
              <a href="https://www.linkedin.com/in/cameronhope1/" target="_blank" className="text-gray-300 text-[2.75vw]">LinkedIn</a>
              <a href="https://github.com/CHope12/" target="_blank" className="text-gray-300 text-[2.75vw] underline">GitHub</a>
              <a href="./cv.pdf" target="_blank" className="text-gray-300 text-[2.75vw]">CV</a>
            </div>
            </div>
          </div>
        </FadeIn>
        )}

        <FadeIn className="card col-span-5 md:col-span-2 row-span-2 md:row-span-1 rounded-lg shadow-md flex items-center justify-center" delay={mobile ? 900 : 1000}>
          <div className="card-content flex items-center justify-center">
            <p className="text-white text-[3vw] md:text-[1.25vw] lg:text-sm flex flex-col text-center"><span>© {new Date().getFullYear()} • Made with <span className="text-red-500">♥</span></span> by Cameron Hope</p>
          </div>
        </FadeIn>

      </div>
    </div>    
    </main>
  );
}