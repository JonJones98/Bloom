"use client";

import * as React from "react";
import { useState, useRef } from "react";
import { Button } from "./ui/button";
import html2canvas from 'html2canvas';

type PreviewData = {
  name?: string;
  email?: string;
  title?: string;
  company?: string;
  phone?: string;
  link?: string;
  qrCodeSVG?: string; // You can pass SVG markup as a string here
  isPreviewRender?: boolean;
  isRotate?: boolean;
  cardStyle?: 'modern' | 'classic' | 'minimal' | 'creative';
  colorScheme?: 'blue' | 'green' | 'purple' | 'orange' | 'black';
  fontStyle?: 'sans' | 'serif' | 'mono';
  backgroundStyle?: [string, string];
  borderStyle?: string;
};

export function Preview_Business_Card({ data = {} }: { data?: PreviewData }) {
  // State for drag functionality
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotationY, setRotationY] = useState(0);
  const [rotationZ, setRotationZ] = useState(0);
  const [isRotateZ, setIsRotateZ] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    // Calculate rotation based on horizontal mouse movement from drag start
    const deltaX = e.clientX - dragStart.x;
    
    // Calculate Y-axis rotation based on horizontal movement
    const calculatedRotationY = (deltaX * 0.1);
    // Limit Y-axis rotation between -30 and 30 degrees
    const limitedRotationY = Math.max(-30, Math.min(30, calculatedRotationY));
    setRotationY(limitedRotationY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleCardReset = () =>{
    setRotationY(0);
    setIsDragging(false);
    setDragStart({ x: 0, y: 0 });
  }
  const { name, email, title, company, phone,isPreviewRender,cardStyle = 'classic', colorScheme = 'orange', fontStyle = 'sans',backgroundStyle = ['color', '#f0f0f0'], borderStyle = '#0cd4bd' } = data;
  
  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    
    try {
      // Reset any transforms before capturing
      const originalTransform = cardRef.current.style.transform;
      const originalWidth = cardRef.current.style.width;
      const originalHeight = cardRef.current.style.height;
      
      // Temporarily set to fixed size for high-quality capture
      cardRef.current.style.transform = 'none';
      cardRef.current.style.width = '500px';
      cardRef.current.style.height = '285px';
      
      // Configure html2canvas options for high quality
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        allowTaint: true,
        width: 500,
        height: 285,
      });
      
      // Restore original styles
      cardRef.current.style.transform = originalTransform;
      cardRef.current.style.width = originalWidth;
      cardRef.current.style.height = originalHeight;
      
      // Create download link
      const link = document.createElement('a');
      link.download = `business-card-${name || 'untitled'}.png`;
      link.href = canvas.toDataURL('image/png');
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('Business card downloaded successfully!');
    } catch (error) {
      console.error('Error downloading business card:', error);
    }
  };
  const handleRotateImage = () => {
    if (isRotateZ) {
      // If currently rotated, reset to original
      setRotationZ(90);
      setIsRotateZ(false);
    } else {
      // Rotate 90 degrees
      setRotationZ(0);
      setIsRotateZ(true);
    }
  };
  // Style configurations
  const getStyleClasses = () => {
    let baseClasses = "flex items-start justify-start px-2 sm:px-4 md:px-6 pt-4 sm:pt-6 md:pt-8 lg:pt-10 rounded-md w-full max-w-[500px] max-h-[285px] aspect-[500/285] gap-2 sm:gap-3 md:gap-4 lg:gap-5 shadow-lg transition-all duration-300 hover:shadow-xl cursor-grab justify-center items-center";
    
    if (isDragging) {
      baseClasses += " cursor-grabbing";
    }
    return baseClasses;
  };
  const getBorderStyle = (): React.CSSProperties => {
    if (borderStyle === '') {
      return { borderWidth: '0px', borderStyle: 'solid' };
    }
    else{
    let borderconfig: React.CSSProperties = { borderWidth: '2px', borderStyle: 'dashed', borderColor: borderStyle || "#000000" };
    // Card style variations
    switch (cardStyle) {
      case 'modern':
        borderconfig = {
          borderTopWidth: '0px',
          borderRightWidth: '0px',
          borderBottomWidth: '0px',
          borderLeftWidth: '4px',
          borderTopStyle: 'solid',
          borderRightStyle: 'solid',
          borderBottomStyle: 'solid',
          borderLeftStyle: 'solid',
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: borderStyle
        };
        break;
      case 'classic':
        // const baseColor = hex2rgb(borderStyle);
        // const topColor = `rgb(${Math.min(baseColor.r + 20, 255)}, ${Math.min(baseColor.g + 20, 255)}, ${Math.min(baseColor.b + 20, 255)})`;
        // const rightColor = `rgb(${Math.min(baseColor.r + 10, 255)}, ${Math.min(baseColor.g + 10, 255)}, ${Math.min(baseColor.b + 10, 255)})`;
        // const bottomColor = `rgb(${Math.max(baseColor.r - 10, 0)}, ${Math.max(baseColor.g - 10, 0)}, ${Math.max(baseColor.b - 10, 0)})`;
        // const leftColor = `rgb(${Math.max(baseColor.r - 20, 0)}, ${Math.max(baseColor.g - 20, 0)}, ${Math.max(baseColor.b - 20, 0)})`;
        // borderconfig = {
        //   borderTopWidth: '4px',
        //   borderRightWidth: '4px',
        //   borderBottomWidth: '4px',
        //   borderLeftWidth: '4px',
        //   borderTopStyle: 'solid',
        //   borderRightStyle: 'solid',
        //   borderBottomStyle: 'solid',
        //   borderLeftStyle: 'solid',
        //   borderTopColor: topColor,
        //   borderRightColor: rightColor,
        //   borderBottomColor: bottomColor,
        //   borderLeftColor: leftColor,
        // };
        borderconfig = { borderColor: borderStyle, borderWidth: '4px', borderStyle: 'solid' };
        break;
      case 'minimal':
        borderconfig = { borderColor: borderStyle, borderWidth: '2px', borderStyle: 'solid' };
        break;
      case 'creative':
        borderconfig = { borderColor: borderStyle, borderWidth: '2px', borderStyle: 'dashed' };
        break;
      default:
        borderconfig = { borderColor: borderStyle, borderWidth: '0px', borderStyle: 'solid' };
      }
    return borderconfig;
    }
  }
  const getFontClass = () => {
    switch (fontStyle) {
      case 'serif':
        return 'font-serif';
      case 'mono':
        return 'font-mono';
      default:
        return 'font-sans';
    }
  };
  const getBackgroundStyle = () => {
    switch (backgroundStyle[0]){
      case 'image':
        console.log("Image background style:", backgroundStyle);
        return { backgroundImage: `url(${backgroundStyle[1]})`, backgroundSize: 'cover', backgroundPosition: 'center' };
      case 'color':
        return { backgroundColor: backgroundStyle[1] };
      default:
        return { backgroundColor: '#f0f0f0' };
    }
  };
  return (
    <main 
      className="flex flex-col items-center max-p-10 p-5 sm:p-10 md:p-10 justify-center w-full h-full min-h-fit gap-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-gap-4" 
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Stop dragging if mouse leaves the area
    >
      {/* Card Container with responsive scaling */}
      <div className="w-full h-full flex items-center justify-center max-w-4xl max-h-[70vh] min-h-fit">
        <div 
          ref={cardRef}
          className={`print-card ${getStyleClasses()} ${getFontClass()} justify-between h-fit`}
          style={{
            transform: `rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`,
            transformOrigin: 'center center center',
            userSelect: 'none', // Prevent text selection while dragging
            ...getBackgroundStyle(),
            ...getBorderStyle(),
          }}
          onMouseDown={handleMouseDown}
        >
          <div className="flex flex-col w-1/3 h-full justify-center gap-1 text-gray-900"
          style={{
            transform: `rotateZ(${-rotationZ}deg)`,
            transformOrigin: 'center center center',
            userSelect: 'none', // Prevent text selection while dragging
          }}
          >
          {/* Display the data */}
          <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl">{name}</p>
          <p className="text-xs sm:text-sm md:text-md">{email}</p>
          <p className="text-xs sm:text-sm md:text-md font-medium">{title}</p>
          <p className="text-xs sm:text-sm md:text-md">{company}</p>
          <p className="text-xs sm:text-sm md:text-md">{phone}</p>
          </div>
          <div className="flex justify-center items-center border border-gray-300 rounded-md h-fit aspect-square max-w-[50%] max-h-[90%]">
          {/* QR Code Section */}
          {data.qrCodeSVG && (
            <div
              className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full"
              dangerouslySetInnerHTML={{ __html: data.qrCodeSVG }}
            />
          )}
          </div>
        </div>
      </div>
      {/* ButtonsObjects */}
      <div className="w-full flex flex-row justify-evenly gap-4 no-print absolute bottom-2 left-0">
        <Button variant="outline" className="w-1/4" onClick={handleCardReset}>Reset Position</Button>
        <Button variant="outline" className={`w-1/4 ${isPreviewRender ? 'hidden' : ''}`} onClick={handleDownloadImage}>Download Image</Button>
        <Button variant="outline" className={`w-1/4`} onClick={handleRotateImage}>Rotate</Button>
      </div>
    </main>
  );
}
  