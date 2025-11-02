"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import html2canvas from 'html2canvas';
import { useBusinessCardForm } from "@/contexts/business-card-form-context";
import Image from "next/image";

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
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editCompany, setEditCompany] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [editLink, setEditLink] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
const { 
    formData,
    updateFormData
  } = useBusinessCardForm();

// Initialize default form values on first mount only
const initDefaultsRef = useRef(false);
useEffect(() => {
  if (initDefaultsRef.current) return;
  initDefaultsRef.current = true;

  // Only set defaults when values are missing/empty
  updateFormData("name", formData?.name || "John Doe");
  updateFormData("email", formData?.email || "john.doe@example.com");
  updateFormData("title", formData?.title || "Software Engineer");
  updateFormData("company", formData?.company || "Your Company Name");
  updateFormData("phone", formData?.phone || "(XXX) XXX-XXXX");
  updateFormData("link", formData?.link || "https://your-link.com");
  updateFormData("qrCodeSVG", formData?.qrCodeSVG || "");
  updateFormData("isPreviewRender", true);
  updateFormData("isRotate", false);
  updateFormData("cardStyle", formData?.cardStyle || "classic");
  updateFormData("colorScheme", formData?.colorScheme || "orange");
  updateFormData("fontStyle", formData?.fontStyle || "sans");
  updateFormData("backgroundStyle", formData?.backgroundStyle || ['color', '#f0f0f0']);
  updateFormData("borderStyle", formData?.borderStyle || '#0cd4bd');
}, []);
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
  const isPreviewRender=true
  const cardStyle = 'classic'
  const colorScheme = 'orange'
  const fontStyle = 'sans'
  const backgroundStyle = ['color', '#f0f0f0']
  const borderStyle = '#0cd4bd';
  
  
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
      link.download = `business-card-${formData.name || 'untitled'}.png`;
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
    let baseClasses = "flex items-center justify-center rounded-md max-w-[500px] max-h-[285px] aspect-[500/285] gap-2 sm:gap-3 md:gap-4 lg:gap-5 shadow-lg transition-all duration-300 hover:shadow-xl cursor-grab";
    
    if (isDragging) {
      baseClasses += " cursor-grabbing";
    }
    return baseClasses;
  };
  const getBorderStyle = (): React.CSSProperties => {
    if (formData.borderStyle === '') {
      return { borderWidth: '0px', borderStyle: 'solid' };
    }
    else{
    let borderconfig: React.CSSProperties = { borderWidth: '2px', borderStyle: 'dashed', borderColor: formData.borderStyle || "#000000" };
    // Card style variations
    switch (formData.cardStyle) {
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
    switch (formData.fontStyle) {
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
  const handleGenerateQRCode = async () => {
    setIsGeneratingQR(true);
    updateFormData('isFormComplete',true)

    try {
      // Create vCard data for QR code
      const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${formData.name}
ORG:${formData.company}
TITLE:${formData.title}
EMAIL:${formData.email}
TEL:${formData.phone}
URL:${formData.link}
END:VCARD`;

      // Option 1: Using QR Server API (free)
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&format=svg&data=${encodeURIComponent(
        vCardData
      )}`;

      const response = await fetch(qrApiUrl);

      if (!response.ok) {
        throw new Error("Failed to generate QR code");
      }

      const qrCodeSVG = await response.text();
      updateFormData("qrCodeSVG",qrCodeSVG)
    } catch (error) {
      console.error("Error generating QR code:", error);
      alert("Failed to generate QR code. Please try again.");
    } finally {
      setIsGeneratingQR(false);
    }
  }

  return (
    <main 
      className="flex flex-col items-center max-p-10 p-5 sm:p-10 md:p-10 justify-center w-full h-full min-h-fit gap-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-gap-4" 
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Stop dragging if mouse leaves the area
    >
      
      {/* Card Container with responsive scaling */}
      <div className="w-full h-full flex  items-center justify-center  max-h-[70vh] min-h-fit">
        {/* Business Cards*/}
        <div 
          ref={cardRef}
          className={`print-card ${getStyleClasses()} max-w-[500px] max-h-[285px] aspect-[500/285] justify-center items-center h-fit w-full p-2 bg-green-600`}
          style={{
            transform: `rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`,
            transformOrigin: 'center center center',
            userSelect: 'none', // Prevent text selection while dragging
            ...getBackgroundStyle(),
            ...getBorderStyle(),
          }}
          onMouseDown={handleMouseDown}
        >
          <div className={`flex ${rotationZ?'flex-row':'flex-col'} w-full h-full justify-center items-center `}
          >
          {/* Profile Picture Section */}
          <div className="flex justify-center items-center rounded-md w-full h-full overflow-hidden "
          >
            <img
              src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAflBMVEX///8AAACzs7MfHx8HBwfw8PDt7e2hoaGEhIR3d3dycnIMDAxqamr7+/vU1NT09PQjIyNeXl7c3NwyMjKJiYmXl5dXV1dhYWE3NzdCQkLW1tYZGRnBwcEuLi66urqYmJhSUlLi4uITExPLy8uqqqpISEiGhoaPj48+Pj6mpqYxgGBjAAAEwElEQVR4nO2dCXriMAyFMQkQQoCUrUChbG1D73/BIVCGpSyxJed5PPpPoPc5km0tTqUiCIIgCIIgCIIgCML/R7dTHUbNOG5Gw2qni7bGkE42StUF6Wg4RVulyywJ1E2CeIO2rTi1LL2t4mdhshrawkLU49YjGTmtZh1t5VO60VMZeymR465fveMaN5ylirb1AbWXojJyXpx1lU3h5TiQOhrAFqGeDqXCBtrmWzR1ZeQ00Vb/5tVEh1IJ2u5rtNz8nFe05ZckpjqUitG2n/NlrkOpDG39iSpFh1LObI29QqeS+6xXaAUH2mOaDqW2bbSGPRFVh1IDtIacqfaG/puwh1ax45OuQ6lPtIpK5Z1Dh1LvaB2VPo+QMVoHcQs5gV6SCZcQsJdMuXQohQ1cMZ8Q7NXkjU9IgNQx49Oh1AwoxOh6ew/ktzXnFNLH6ahx6lAKl3xkOp4cwe2JA14huDuvcerkNriEypZXyAQmRDPX+4wUJoThbnhOC6WjzatDKVQOgnkbwW0kdW4hqMqiNyvijY94E7X82Ue82dm9OWt5c/r15j7CvCMC21N8ubNz5uewWRRv8lreZBo5vy1s40CHTwi4AZWtPoI7nxzwpmLlTQ2Ra0ngC+JPnd2fzgeOXpQvtIY99O6gsRvdQfR+LSc+rBxfOuiIbuJEs9YRQpepY52/I1MdL2jLr2gbpoYc61/OMbqaONgbbzStsEDbfBvd+ZHA0fmRSqWu5fIjZyd6dlQLZyOcnrHa0W36MfW2Y1VgDjF2fw4xpz54PBk6+Ddk7Jkld5zlLYEmFE3oZMurcBwssw7aKkNqm48sipMkjrKPjcvRVhAEQRCEJ6xmjSgZTfrzNAjSeX8ySqLGzJEZ0KJMF8n2zll+vU0azmRIH9IbLtfP7iPr5cLxpdk0H95Ezpk3nT0Jr6LCKn60fLl4w3pf6qnYEy4dqB2e014Y9wnNG45UeXa0h6SWlGDhiJQGudk0/UZr2DFj6RgYo7OneknSR7xCI1jj6d5XnDXu+6qzND2cWIIWpcq4HAfeELtKm3W89UhUuo46W8fZJZ8lf14d5kGFE2mph/x3YtPGI9YlZrm/mSdgLgk/ytKxsCkjp6Sn6TLbOpQqpWw9tK+jlDVplKFDKet+wtbn+4TQ8ia/sRh3L2lZzU2sGKcTnhFY3OPpbZg6WHzQzfB1TFOsDWKUFLBOWApd1K5Yfey8e1iugxzY2hBCeubTFAvDohy9/Pq0+G8nzJPSRWGfxyg9Yh1hjlzdErf0SwLeVjsrKZNisCZWVqVvISdanGcuQg8/HcZu7RUk9B5hXBLWaW992JakBvSQnDVX4GJ+o0IfroOKtfRoUZhefmF+a8MEniyqSQGdGZb5pTo09h4IOdzdeqa3CBz1RUsVHT2WdB3s77MZEdL70b/RGg7QryXMT0+ZQp9XZK9Bm0F+/oXx4RMa1CyEE8E3h1r6ccRF6E6i2aZojzlNRxdt/19CWpFhg7b/BK2CBcvL/YZ23ALms66h5becCVrUsAVKXd+C9gAX/Lp+gnZxByeCzllTdLA/TUyBImSFNv4cSua0hzb+HEqJl/FfQnQoB3lnbiM5lIcca1WHcP+5C0EQBEEQBEEQBEFg5A8Hl1WxeQxmoAAAAABJRU5ErkJggg==`}
              alt="QR Code"
              className="w-auto h-auto max-w-full max-h-full rounded-full"
              style={{
            transform: `rotateZ(${-rotationZ}deg)`,
            transformOrigin: 'center center center',
            userSelect: 'none', // Prevent text selection while dragging
          }}
            />
          </div>
          {/* Text Section */}
          <div className="flex flex-col w-full h-fit justify-center items-center gap-1 text-gray-900 p-4 "
          style={{
            transform: `rotateZ(${-rotationZ}deg)`,
            transformOrigin: 'center center center',
            userSelect: 'none', // Prevent text selection while dragging
          }}
          >
          {/* Display the data */}
          {editName?(<input type="text" className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl border-1 p-0 m-0 bg-gray-300 focus:ring-0 focus:outline-none w-full text-center" value={formData.name} onChange={(e) => updateFormData("name", e.target.value)} onBlur={() => setEditName(false)} autoFocus />)
          :(<p className="flex justify-center font-semibold text-sm sm:text-base md:text-lg lg:text-xl w-full text-center" onClick={() => setEditName(true)}>{formData.name}</p>)
          }
          {editEmail?(<input type="text" className="font-semibold text-xs sm:text-sm md:text-md border-1 p-0 m-0 bg-gray-300 focus:ring-0 focus:outline-none w-full text-center" value={formData.email} onChange={(e) => updateFormData("email", e.target.value)} onBlur={() => setEditEmail(false)} autoFocus />)
          :(<p className="flex justify-center text-xs sm:text-sm md:text-md w-full text-center" onClick={() => setEditEmail(true)}>{formData.email}</p>)
          }
          {editTitle?(<input type="text" className="font-semibold text-xs sm:text-sm md:text-md border-1 p-0 m-0 bg-gray-300 focus:ring-0 focus:outline-none w-full text-center" value={formData.title} onChange={(e) => updateFormData("title", e.target.value)} onBlur={() => setEditTitle(false)} autoFocus />)
          :(<p className="flex justify-center text-xs sm:text-sm md:text-md font-medium w-full text-center" onClick={() => setEditTitle(true)}>{formData.title}</p>)
          }
          {editCompany?(<input type="text" className="font-semibold text-xs sm:text-sm md:text-md border-1 p-0 m-0 bg-gray-300 focus:ring-0 focus:outline-none w-full text-center" value={formData.company} onChange={(e) => updateFormData("company", e.target.value)} onBlur={() => setEditCompany(false)} autoFocus />)
          :(<p className="flex justify-center text-xs sm:text-sm md:text-md w-full text-center" onClick={() => setEditCompany(true)}>{formData.company}</p>)
          }
          {editPhone?(<input type="text" className="font-semibold text-xs sm:text-sm md:text-md border-1 p-0 m-0 bg-gray-300 focus:ring-0 focus:outline-none w-full text-center" value={formData.phone} onChange={(e) => updateFormData("phone", e.target.value)} onBlur={() => setEditPhone(false)} autoFocus />)
          :(<p className="flex justify-center text-xs sm:text-sm md:text-md w-full text-center"
            onClick={() => setEditPhone(true)}
          >
            {(() => {
              const raw = formData.phone || "";
              const digits = raw.replace(/\D/g, "");
              if (!digits) return "";
              // 10-digit (US) -> (123) 456-7890
              if (digits.length === 10) {
                return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
              }
              // 11-digit starting with 1 -> +1 (123) 456-7890
              if (digits.length === 11 && digits[0] === "1") {
                return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
              }
              // Fallback: return original input
              return raw;
            })()}
          </p>)
          }
          </div>
          </div>
          {/* QR Code Section */}
          <div className="flex justify-center items-center rounded-md w-full h-full overflow-hidden"
          style={{
            transform: `rotateZ(${-rotationZ}deg)`,
            transformOrigin: 'center center center',
            userSelect: 'none', // Prevent text selection while dragging
          }}
          >
          
          {data.qrCodeSVG && (
            // <div
            //   className="w-fit h-fit flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full"
            //   dangerouslySetInnerHTML={{ __html: data.qrCodeSVG }}
            // />
            <img src={`data:image/svg+xml;utf8,${encodeURIComponent(data.qrCodeSVG)}`} alt="QR Code" />
          )}
          </div>
        </div>
      </div>
      {/* ButtonsObjects */}
      <div className="w-full flex flex-row justify-evenly gap-4 no-print absolute bottom-2 left-0">
        <Button variant="outline" className="w-1/4" onClick={handleCardReset}>Reset Position</Button>
        <Button variant="outline" className={`w-1/4 ${isPreviewRender ? 'hidden' : ''}`} onClick={handleDownloadImage}>Download Image</Button>
        <Button
              className="w-1/4 h-full min-w-fit"
              onClick={handleGenerateQRCode}
              disabled={isGeneratingQR}
              variant="outline"
            >Generate QR</Button>
        <Button variant="outline" className={`w-1/4`} onClick={handleRotateImage}>Rotate</Button>
      </div>
    </main>
  );
}
  