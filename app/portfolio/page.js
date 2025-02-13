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
import { SiWordpress } from "react-icons/si";
import { TbBrandThreejs } from "react-icons/tb";

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
    link: "https://unity.com/products/netcode"
  },
  {
    name: "C#",
    icon: <SiCsharp />,
    link: "https://docs.microsoft.com/en-us/dotnet/csharp/"
  },
  {
    name: "Wordpress",
    icon: <SiWordpress />,
    link: "https://wordpress.com/"
  },
  {
    name: "Three.js",
    icon: <TbBrandThreejs />,
    link: "https://threejs.org/"
  }
]

const portfolioItems = [
  {
    title: "Photography Portfolio Website",
    image: "/images/screen1.jpg",
    type: "Freelance development",
    link: "https://eleanorwakefield.com/",
    description: "A website I created for a local photographer. The website is built using Next.js and is hosted on Vercel. The website features portfolio and project galleries of the artist's work, and a contact form.",    
    tech: techIcons.filter(tech => tech.name === "Next.js" || tech.name === "JavaScript" || tech.name === "Tailwind CSS"),
    textColor: "white",
  },
  {
    title: "Hopzag Website Development Agency",
    image: "/images/screen8.png",
    type: "Business project",
    link: "https://hopzag.co.uk/",
    description: "A website I created for my website development business. The website features my services, a portfolio of my work and a contact form.",
    tech: techIcons.filter(tech => tech.name === "Next.js" || tech.name === "JavaScript" || tech.name === "Tailwind CSS" || tech.name === "Three.js"),
  },
  {
    title: "Multiplayer Fighter Game",
    image: "/images/screen4.jpg",
    type: "University project",
    link: "/mfg",
    description: "For my final year project in university, I created a multiplayer fighting game using Unity and C#. The game features a lobby system, character selection, and fighting mechanics. Player can start a server and connect to each other over the internet using a lobby code.",
    tech: techIcons.filter(tech => tech.name === "Unity" || tech.name === "Unity Networking" || tech.name === "C#"),
    textColor: "white",
  },
  {
    title: "Brikbloom Property Sourcing",
    image: "/images/screen5.jpg",
    type: "Freelance development",
    link: "https://brikbloom.com",
    description: "A website I created for a property sourcer. The website features key information about the business and a contact form.",
    tech: techIcons.filter(tech => tech.name === "Next.js" || tech.name === "JavaScript" || tech.name === "Tailwind CSS"),
    textColor: "black",
  },
  {
    title: "Finance Tracker",
    image: "/images/screen3.jpg",
    type: "Personal project",
    link: "https://finance.cameronhope.co.uk/",
    description: "A web application I created which allows users to track their daily, weekly and monthly expenses and income. The app features a user authentication and data storage using Firebase.",
    tech: techIcons.filter(tech => tech.name === "Next.js" || tech.name === "Firebase" || tech.name === "Tailwind CSS"),
    textColor: "black",
  },
  {
    title: "The Guidance Company",
    image: "/images/screen6.jpg",
    type: "Freelance development",
    link: "https://theguidancecompany.co.uk/",
    description: "A website I made using Wordpress for a local client's potential business. It only reached a first draft however provided valuable insight into wordpress and its ecosystem",
    tech: techIcons.filter(tech => tech.name === "Wordpress"),
    textColor: "black",
  },  
  {
    title: "Art Store (Work in progress)",
    image: "/images/screen7.png",
    type: "Personal project",
    link: "https://art-iota-woad.vercel.app/",
    description: "A web application I am currently working on which will allow users to buy and sell digital art. The app features user authentication using Auth0 and data storage using MongoDB.",
    tech: techIcons.filter(tech => tech.name === "Next.js" || tech.name === "MongoDB" || tech.name === "Node.js" || tech.name === "Three.js"|| tech.name === "Auth0" || tech.name === "Tailwind CSS"),
    textColor: "black",
  },
  {
    title: "Calorie Counter (Work in progress)",
    image: "/images/screen2.jpg",
    type: "Personal project",
    link: "",
    description: "A web application I created which allows users to track their daily calorie intake and set goals for their daily intake. The app features Auth0 user authentication system and a MongoDB database to store user data.",
    tech: techIcons.filter(tech => tech.name === "Next.js" || tech.name === "MongoDB" || tech.name === "Node.js" || tech.name === "Express" || tech.name === "Mongoose" || tech.name === "Auth0" || tech.name === "Tailwind CSS"),
    textColor: "black",
  }
]

//neon colors
const colors = ["#ff0000", "#ff7700", "#ffcc00", "#33ff00", "#00ffcc", "#0066ff", "#3300ff", "#cc00ff", "#ff00cc", "#ff0066"]

const Page = () => {
  return (
    <>
      <BackButton />          
      <div className="flex flex-wrap h-full pb-12 md:pb-6 items-center justify-center gap-12 pt-28">
        {portfolioItems.map((item, index) => (          
            <div 
              key={index}
              className="flex items-center justify-center w-[90%] md:w-[45%]"
            >          
            <FadeIn className="w-full" delay={(index+1)*100}>
              <PortfolioCard
                title={item.title}
                image={item.image}
                link={item.link}
                type={item.type}
                description={item.description}
                tech={item.tech}
                textColor={item.textColor}
              />
            </FadeIn>    
            </div>
        ))}
      </div>
    </>
  )
}

export default Page;