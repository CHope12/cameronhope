import React from 'react';
import BackButton from '@/components/BackButton'
import PortfolioCard from '@/components/PortfolioCard'
import FadeIn from '@/components/FadeIn'

import { SiNextdotjs } from "react-icons/si";
import { FaJs } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { IoLogoFirebase } from "react-icons/io5";
import { SiExpress } from "react-icons/si";
import { SiMongoose } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { SiAuth0 } from "react-icons/si";
import { FaUnity } from "react-icons/fa";
import { SiUnity } from "react-icons/si";
import { SiCsharp } from "react-icons/si";

const techIcons = [
  {
    name: "Next.js",
    icon: <SiNextdotjs />,
    link: "https://nextjs.org/"
  },
  {
    name: "JavaScript",
    icon: <FaJs />,
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
  },
  {
    name: "Node.js",
    icon: <FaNodeJs />,
    link: "https://nodejs.org/"
  },
  {
    name: "Tailwind CSS",
    icon: <RiTailwindCssFill />,
    link: "https://tailwindcss.com/"
  },
  {
    name: "Firebase",
    icon: <IoLogoFirebase />,
    link: "https://firebase.google.com/"
  },
  {
    name: "Express",
    icon: <SiExpress />,
    link: "https://expressjs.com/"
  },
  {
    name: "Mongoose",
    icon: <SiMongoose />,
    link: "https://mongoosejs.com/"
  },
  {
    name: "MongoDB",
    icon: <SiMongodb />,
    link: "https://www.mongodb.com/"
  },
  {
    name: "Auth0",
    icon: <SiAuth0 />,
    link: "https://auth0.com/"
  },
  {
    name: "Unity",
    icon: <FaUnity />,
    link: "https://unity.com/"
  },
  {
    name: "Unity Networking",
    icon: <SiUnity />,
    link: "https://docs.unity3d.com/Manual/UNet.html"
  },
  {
    name: "C#",
    icon: <SiCsharp />,
    link: "https://docs.microsoft.com/en-us/dotnet/csharp/"
  }
]

const portfolioItems = [
  {
    title: "Photography Portfolio Website",
    image: "/images/3.jpg",
    type: "Freelance development",
    link: "https://eleanorwakefield.com/",
    description: "A website I created for a local photographer. The website is built using Next.js and is hosted on Vercel. The website features portfolio and project galleries of the artist's work, and a contact form.",    
    tech: techIcons.filter(tech => tech.name === "Next.js" || tech.name === "JavaScript" || tech.name === "Tailwind CSS"),
    textColor: "white",
  },
  {
    title: "Calorie Counter",
    image: "/images/test.jpg",
    type: "Personal project",
    link: "https://calorie-counter-psi.vercel.app/",
    description: "A web application I created which allows users to track their daily calorie intake and set goals for their daily intake. The app features Auth0 user authentication system and a MongoDB database to store user data.",
    tech: techIcons.filter(tech => tech.name === "Next.js" || tech.name === "MongoDB" || tech.name === "Node.js" || tech.name === "Express" || tech.name === "Mongoose" || tech.name === "Auth0" || tech.name === "Tailwind CSS"),
    textColor: "black",
  },
  {
    title: "Finance Tracker",
    image: "/images/screen4.jpg",
    type: "Personal project",
    link: "https://finance-app-psi.vercel.app/",
    description: "A web application I created which allows users to track their daily, weekly and monthly expenses and income. The app features a user authentication and data storage using Firebase.",
    tech: techIcons.filter(tech => tech.name === "Next.js" || tech.name === "Firebase" || tech.name === "Tailwind CSS"),
    textColor: "black",
  },
  {
    title: "Multiplayer Fighter Game",
    image: "/images/screen3.jpg",
    type: "University project",
    link: "",
    description: "For my final year project in university, I created a multiplayer fighting game using Unity and C#. The game features a lobby system, character selection, and fighting mechanics. Player can start a server and connect to each other over the internet using a lobby code.",
    tech: techIcons.filter(tech => tech.name === "Unity" || tech.name === "Unity Networking" || tech.name === "C#"),
    textColor: "white",
  }
]

//neon colors
const colors = ["#ff0000", "#ff7700", "#ffcc00", "#33ff00", "#00ffcc", "#0066ff", "#3300ff", "#cc00ff", "#ff00cc", "#ff0066"]

const Page = () => {
  return (
    <>
      <BackButton />          
      <div className="flex flex-wrap h-full py-6 items-center justify-center gap-12 pt-28">
        {portfolioItems.map((item, index) => (          
            <div 
              key={index}
              className="flex items-center justify-center w-[90%] md:w-[45%] portfolioItem"
            >          
            <FadeIn className="w-full" delay={(index+1)*100}>
              <PortfolioCard
                title={item.title}
                image={item.image}
                link={item.link}
                description={item.description}
                tech={item.tech}
                textColor={item.textColor}
              />
            </FadeIn>    
            </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center p-10 text-lg text-gray-400 gap-8">
        <div className="flex flex-col justify-center items-center max-w-3xl gap-3">
          <p>
          I design for startups of all sizes. When you have a groundbreaking business idea, but nothing anyone can look at or click on, that’s where I come in. I do all the heavy lifting; I’ll design you a world-class brand identity, website, or whatever else you need to launch.
          </p>
          <p>
          I take the unfamiliar threads of a new concept, and weave them into a context which lets them mesh gracefully into the zeitgeist with style, and meaningfully align with minds and emotions.
          </p>
          <p>
          I’m a Creative Director and Designer based in New York, and have spent the last fourteen years helping to bring brands to life through thoughtful, strategic design that resonates.
          </p>
        </div>
        <button className="border-2 border-[#303030] px-4 py-1 rounded-md text-gray-200 hover:bg-[#303030] hover:text-white">
          Get in touch
        </button>
      </div>
    </>
  )
}

export default Page;