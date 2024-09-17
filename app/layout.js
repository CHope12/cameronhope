import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const helvetica = localFont({
  src: [
    {
      path: "./fonts/Helvetica-Bold.ttf",
      weight: "700"
    },
    {
      path: "./fonts/Helvetica.ttf",
      weight: "400"
    },
    {
      path: "./fonts/Helvetica-Oblique.ttf",
      weight: "400",
      style: "italic"
    },
    {
      path: "./fonts/Helvetica-BoldOblique.ttf",
      weight: "700",
      style: "italic"
    },
    {
      path: "./fonts/Helvetica-Light.ttf",
      weight: "100 300"      
    }
  ],
  variable: "--font-helvetica"
})

//import { Metadata } from 'next';
 
export const metadata = {
  title: 'Cameron Hope - Web Developer',
  description: 'Cameron Hope is a web developer based in the UK. He is passionate about building beautiful and performant websites.',  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />   
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} ${helvetica.variable} antialiased`}
      >
        <div className="mainBackground">
          <div className="fadeBackground">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
