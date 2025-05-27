// src/app/page.js
'use client'
import Image from "next/image";
import { InteractiveSection } from "./interactive-section";



export default function Login() {
  
  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
    }}>
      <Image
        src="/assets/background-mountain.jpg"
        alt="full screen Background"
        fill
        style={{ objectFit: "cover", zIndex: -1 }}
        priority
      />
      
      <div style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden" 
      }}>
        <InteractiveSection />
      </div>
    </div>
  );
}