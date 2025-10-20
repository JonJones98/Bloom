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
  qrCodeSVG?: string;
  cardStyle?: 'modern' | 'classic' | 'minimal' | 'creative';
  colorScheme?: 'blue' | 'green' | 'purple' | 'orange' | 'black';
  fontStyle?: 'sans' | 'serif' | 'mono';
  isPreviewRender?: boolean;
};

export function StyledPreview_Business_Card({ data = {} }: { data?: PreviewData }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotationY, setRotationY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const { name, email, title, company, phone, cardStyle = 'modern', colorScheme = 'blue', fontStyle = 'sans' } = data;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const calculatedRotationY = (deltaX * 0.1);
    const limitedRotationY = Math.max(-30, Math.min(30, calculatedRotationY));
    setRotationY(limitedRotationY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCardReset = () => {
    setRotationY(0);
    setIsDragging(false);
    setDragStart({ x: 0, y: 0 });
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    
    try {
      const originalTransform = cardRef.current.style.transform;
      cardRef.current.style.transform = 'none';
      
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        allowTaint: true,
        width: 500,
        height: 285,
      });
      
      cardRef.current.style.transform = originalTransform;
      
      const link = document.createElement('a');
      link.download = `business-card-${name || 'untitled'}.png`;
      link.href = canvas.toDataURL('image/png');
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('Business card downloaded successfully!');
    } catch (error) {
      console.error('Error downloading business card:', error);
    }
  };

  // Style configurations
  const getStyleClasses = () => {
    let baseClasses = "flex items-start justify-start p-10 rounded-md w-[500px] h-[285px] gap-5 bg-white shadow-lg transition-all duration-300 hover:shadow-xl cursor-grab";
    
    if (isDragging) {
      baseClasses += " cursor-grabbing";
    }

    // Card style variations
    switch (cardStyle) {
      case 'modern':
        baseClasses += " border-l-4";
        break;
      case 'classic':
        baseClasses += " border-4 border-gray-400";
        break;
      case 'minimal':
        baseClasses += " border border-gray-200 shadow-sm";
        break;
      case 'creative':
        baseClasses += " border-2 border-dashed";
        break;
    }

    return baseClasses;
  };

  const getColorClasses = () => {
    const colors = {
      blue: {
        border: 'border-blue-500',
        text: 'text-blue-600',
        bg: 'bg-blue-50'
      },
      green: {
        border: 'border-green-500',
        text: 'text-green-600',
        bg: 'bg-green-50'
      },
      purple: {
        border: 'border-purple-500',
        text: 'text-purple-600',
        bg: 'bg-purple-50'
      },
      orange: {
        border: 'border-orange-500',
        text: 'text-orange-600',
        bg: 'bg-orange-50'
      },
      black: {
        border: 'border-black',
        text: 'text-gray-800',
        bg: 'bg-gray-50'
      }
    };
    return colors[colorScheme];
  };

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

  const colorClasses = getColorClasses();

  return (
    <main 
      className="flex flex-col items-center justify-center w-full h-full gap-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden" 
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div 
        ref={cardRef}
        className={`print-card ${getStyleClasses()} ${colorClasses.border} ${getFontClass()}`}
        style={{
          transform: `rotateY(${rotationY}deg)`,
          transformOrigin: 'center center',
          userSelect: 'none'
        }}
        onMouseDown={handleMouseDown}
      >
        <div className={`flex flex-col w-1/2 h-full justify-center gap-2 ${colorClasses.text}`}>
          <p className="text-xl font-bold">{name}</p>
          <p className="text-sm">{email}</p>
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-md">{company}</p>
          <p className="text-sm">{phone}</p>
        </div>
        <div className={`flex justify-center items-center border ${colorClasses.border} ${colorClasses.bg} rounded-md h-fit min-h-[200px] w-full`}>
          {data.qrCodeSVG && (
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: data.qrCodeSVG }}
            />
          )}
        </div>
      </div>
      
      <div className="w-full flex flex-row justify-evenly gap-4 no-print">
        <Button variant="outline" className="w-1/4" onClick={handleCardReset}>Reset Position</Button>
        <Button variant="default" className="w-1/4" onClick={handleDownloadImage}>Download Image</Button>
        <Button variant="default" className="w-1/4" onClick={handleDownloadImage}>Rotate</Button>
      </div>
    </main>
  );
}