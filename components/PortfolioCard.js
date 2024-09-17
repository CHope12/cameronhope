import React from 'react'
import Link from 'next/link'

const PortfolioCard = ({ title, image, link, description, tech, textColor }) => {  

  return (
    <div className="relative w-full h-[250px] md:h-[350px] border-[1px] border-[#e5e7eb] border-opacity-50 rounded-lg bg-[#141414] shadow-lg overflow-hidden">
      <div
        className="absolute bg-cover bg-center w-full h-full opacity-50 md:opacity-55 rounded-lg hoverImage"
        style={{ 
          backgroundImage: `url(${image})`,   
      }}
      />       
      <div className={`absolute text-white w-full h-full flex justify-center items-center`}>
        <Link href={link} target="_blank">
          <div className="relative z-10 flex flex-col justify-center items-center">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">{title}</h3>
            <p className="text-sm md:text-md lg:text-lg py-4 w-3/4 flex justify-center items-center text-white">{description}</p>        
          </div>
        </Link>      
        <div className="absolute bottom-2 right-2 z-10 flex text-3xl gap-2">
          {tech.map((item, index) => (
            <div key={index} className="flex justify-center items-center">
              <Link href={item.link} target="_blank" className="hoverIcon">
                {item.icon}            
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PortfolioCard
