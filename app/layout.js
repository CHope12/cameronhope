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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
