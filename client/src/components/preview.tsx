"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import html2canvas from 'html2canvas';
import { useBusinessCardForm } from "@/contexts/business-card-form-context";

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
  const [isExporting, setIsExporting] = useState(false);
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

  const handleSliderRotate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextRotation = Number(e.target.value);
    setRotationY(nextRotation);
    setIsDragging(false);
  };

  const handleCardReset = () =>{
    setRotationY(0);
    setIsDragging(false);
    setDragStart({ x: 0, y: 0 });
  }
  const effectiveData = {
    ...formData,
    ...data,
  };

  const colorSchemeConfig: Record<NonNullable<PreviewData["colorScheme"]>, { tint: string; text: string }> = {
    blue: { tint: "#3b82f6", text: "#0f172a" },
    green: { tint: "#15803d", text: "#102114" },
    purple: { tint: "#7c3aed", text: "#1f1536" },
    orange: { tint: "#ea580c", text: "#2a1405" },
    black: { tint: "#111827", text: "#111111" },
  };

  const activeScheme = colorSchemeConfig[effectiveData.colorScheme || "orange"];
  const resolvedBorderColor = effectiveData.borderStyle || activeScheme.tint;
  
  
  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    const cardEl = cardRef.current;

    const originalTransform = cardEl.style.transform;
    const originalWidth = cardEl.style.width;
    const originalHeight = cardEl.style.height;
    const originalBackgroundImage = cardEl.style.backgroundImage;
    const originalBackgroundColor = cardEl.style.backgroundColor;
    const originalBackgroundSize = cardEl.style.backgroundSize;
    const originalBackgroundPosition = cardEl.style.backgroundPosition;
    const originalBackgroundRepeat = cardEl.style.backgroundRepeat;
    const originalBackgroundBlendMode = cardEl.style.backgroundBlendMode;
    const originalFilter = cardEl.style.filter;
    
    try {
      setIsExporting(true);
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

      const exportBackground = getBackgroundStyle();
      
      // Temporarily set to fixed size for high-quality capture
      cardEl.style.transform = 'none';
      cardEl.style.width = '500px';
      cardEl.style.height = '285px';
      cardEl.style.filter = 'none';
      cardEl.style.backgroundBlendMode = 'normal';

      if ("backgroundImage" in exportBackground && exportBackground.backgroundImage) {
        cardEl.style.backgroundImage = exportBackground.backgroundImage as string;
        cardEl.style.backgroundSize = (exportBackground.backgroundSize as string) || 'cover';
        cardEl.style.backgroundPosition = (exportBackground.backgroundPosition as string) || 'center';
        cardEl.style.backgroundRepeat = 'no-repeat';
      } else {
        cardEl.style.backgroundImage = 'none';
        cardEl.style.backgroundColor =
          ("backgroundColor" in exportBackground && exportBackground.backgroundColor
            ? exportBackground.backgroundColor
            : '#f0f0f0') as string;
      }
      
      // Configure html2canvas options for high quality
      const canvas = await html2canvas(cardEl, {
        useCORS: true,
        allowTaint: true,
        width: 500,
        height: 285,
      });
      
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
    } finally {
      cardEl.style.transform = originalTransform;
      cardEl.style.width = originalWidth;
      cardEl.style.height = originalHeight;
      cardEl.style.backgroundImage = originalBackgroundImage;
      cardEl.style.backgroundColor = originalBackgroundColor;
      cardEl.style.backgroundSize = originalBackgroundSize;
      cardEl.style.backgroundPosition = originalBackgroundPosition;
      cardEl.style.backgroundRepeat = originalBackgroundRepeat;
      cardEl.style.backgroundBlendMode = originalBackgroundBlendMode;
      cardEl.style.filter = originalFilter;
      setIsExporting(false);
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
  const normalizedTilt = Math.max(-1, Math.min(1, rotationY / 30));
  const getEdgeWidths = () => {
    switch (effectiveData.cardStyle) {
      case 'modern':
        return {
          top: 0,
          bottom: 0,
          left: Math.max(1, 4 - normalizedTilt * 2.2),
          right: Math.max(0.4, 0.8 + normalizedTilt * 1.8),
        };
      case 'classic':
        return {
          top: 4,
          bottom: 4,
          left: Math.max(1.8, 4 - normalizedTilt * 2.2),
          right: Math.max(1.8, 4 + normalizedTilt * 2.2),
        };
      case 'minimal':
      case 'creative':
        return {
          top: 2,
          bottom: 2,
          left: Math.max(0.8, 2 - normalizedTilt * 1.4),
          right: Math.max(0.8, 2 + normalizedTilt * 1.4),
        };
      default:
        return { top: 0, bottom: 0, left: 0, right: 0 };
    }
  };
  const getBorderStyle = (): React.CSSProperties => {
    if (!resolvedBorderColor) {
      return { borderWidth: '0px', borderStyle: 'solid' };
    }
    else{
    const edgeWidths = getEdgeWidths();
    let borderconfig: React.CSSProperties = { borderWidth: '2px', borderStyle: 'dashed', borderColor: resolvedBorderColor };
    // Card style variations
    switch (effectiveData.cardStyle) {
      case 'modern':
        borderconfig = {
          borderTopWidth: `${edgeWidths.top}px`,
          borderRightWidth: `${edgeWidths.right}px`,
          borderBottomWidth: `${edgeWidths.bottom}px`,
          borderLeftWidth: `${edgeWidths.left}px`,
          borderTopStyle: 'solid',
          borderRightStyle: 'solid',
          borderBottomStyle: 'solid',
          borderLeftStyle: 'solid',
          borderTopColor: 'transparent',
          borderRightColor: resolvedBorderColor,
          borderBottomColor: 'transparent',
          borderLeftColor: resolvedBorderColor
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
        borderconfig = {
          borderColor: resolvedBorderColor,
          borderTopWidth: `${edgeWidths.top}px`,
          borderBottomWidth: `${edgeWidths.bottom}px`,
          borderLeftWidth: `${edgeWidths.left}px`,
          borderRightWidth: `${edgeWidths.right}px`,
          borderStyle: 'solid'
        };
        break;
      case 'minimal':
        borderconfig = {
          borderColor: resolvedBorderColor,
          borderTopWidth: `${edgeWidths.top}px`,
          borderBottomWidth: `${edgeWidths.bottom}px`,
          borderLeftWidth: `${edgeWidths.left}px`,
          borderRightWidth: `${edgeWidths.right}px`,
          borderStyle: 'solid'
        };
        break;
      case 'creative':
        borderconfig = {
          borderColor: resolvedBorderColor,
          borderTopWidth: `${edgeWidths.top}px`,
          borderBottomWidth: `${edgeWidths.bottom}px`,
          borderLeftWidth: `${edgeWidths.left}px`,
          borderRightWidth: `${edgeWidths.right}px`,
          borderStyle: 'dashed'
        };
        break;
      default:
        borderconfig = { borderColor: resolvedBorderColor, borderWidth: '0px', borderStyle: 'solid' };
      }
    return borderconfig;
    }
  }
  const getFontClass = () => {
    switch (effectiveData.fontStyle) {
      case 'serif':
        return 'font-serif';
      case 'mono':
        return 'font-mono';
      default:
        return 'font-sans';
    }
  };
  const getBackgroundStyle = () => {
    const activeBackground = effectiveData.backgroundStyle || ['color', '#f0f0f0'];
    switch (activeBackground[0]){
      case 'image':
        return { backgroundImage: `url(${activeBackground[1]})`, backgroundSize: 'cover', backgroundPosition: 'center' };
      case 'color':
        return { backgroundColor: activeBackground[1] || '#f0f0f0' };
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

  const baseBackgroundStyle = getBackgroundStyle();
  const rotationIntensity = Math.min(1.9, (Math.abs(rotationY) / 14) + (Math.abs(rotationZ) / 50) * 0.7);
  const highlightAngle = 122 - rotationY * 3.1;
  const specularOpacity = 0.22 + rotationIntensity * 0.22;
  const shadowOpacity = 0.2 + rotationIntensity * 0.18;
  const edgeGlowOpacity = 0.18 + rotationIntensity * 0.16;
  const specularOverlay = `linear-gradient(${highlightAngle}deg, rgba(255,255,255,${specularOpacity}) 0%, rgba(255,255,255,0.18) 20%, rgba(229,236,245,0.08) 42%, rgba(255,255,255,0.2) 61%, rgba(255,255,255,0.06) 100%)`;
  const depthOverlay = `linear-gradient(${highlightAngle + 18}deg, rgba(18,24,34,${shadowOpacity}) 0%, rgba(15,18,24,0.02) 34%, rgba(10,12,16,${shadowOpacity * 0.9}) 100%)`;
  const edgeSheenOverlay = `radial-gradient(circle at ${58 + rotationY * 0.75}% ${34 - rotationY * 0.35}%, rgba(255,255,255,${edgeGlowOpacity}) 0%, rgba(255,255,255,0.04) 28%, rgba(255,255,255,0) 62%)`;
  const cardBackgroundWithLight: React.CSSProperties =
    "backgroundImage" in baseBackgroundStyle && baseBackgroundStyle.backgroundImage
      ? {
          ...baseBackgroundStyle,
          backgroundImage: `${specularOverlay}, ${depthOverlay}, ${edgeSheenOverlay}, ${baseBackgroundStyle.backgroundImage}`,
          backgroundBlendMode: "screen, multiply, overlay, normal",
        }
      : {
          ...baseBackgroundStyle,
          backgroundImage: `${specularOverlay}, ${depthOverlay}, ${edgeSheenOverlay}`,
          backgroundBlendMode: "screen, multiply, overlay",
        };
  const cardShadow = `${rotationY * 1.25}px ${18 + rotationIntensity * 18}px ${36 + rotationIntensity * 36}px rgba(0,0,0,${0.34 + rotationIntensity * 0.26}), ${rotationY * -0.75}px ${10 + rotationIntensity * 10}px ${22 + rotationIntensity * 20}px rgba(113,145,105,${0.14 + rotationIntensity * 0.13}), 0 0 ${22 + rotationIntensity * 26}px rgba(248,250,255,${0.16 + rotationIntensity * 0.16}), inset 0 0 ${10 + rotationIntensity * 10}px rgba(255,255,255,${0.12 + rotationIntensity * 0.12})`;
  const metallicSurfaceOverlay = `linear-gradient(${highlightAngle + 8}deg, rgba(255,255,255,${0.14 + rotationIntensity * 0.12}) 0%, rgba(255,255,255,0.02) 28%, rgba(0,0,0,${0.08 + rotationIntensity * 0.08}) 100%), radial-gradient(circle at ${56 + rotationY * 0.9}% ${42 - rotationY * 0.45}%, rgba(255,255,255,${0.22 + rotationIntensity * 0.18}) 0%, rgba(255,255,255,0.04) 33%, rgba(255,255,255,0) 68%)`;
  const edgeWidths = getEdgeWidths();
  const borderLeftRim = edgeWidths.left;
  const borderRightRim = edgeWidths.right;
  const borderTopRim = edgeWidths.top;
  const borderBottomRim = edgeWidths.bottom;

  return (
    <main 
      className="relative overflow-hidden flex flex-col items-center max-p-10 p-5 sm:p-10 md:p-10 justify-center w-full h-full min-h-fit gap-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-gap-4" 
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
          className={`print-card ${getStyleClasses()} relative overflow-hidden max-w-[500px] max-h-[285px] aspect-[500/285] justify-center items-center h-fit w-full p-2`}
          style={{
            transform: `rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`,
            transformOrigin: 'center center center',
            userSelect: 'none', // Prevent text selection while dragging
            boxShadow: cardShadow,
            filter: `saturate(${1.04 + rotationIntensity * 0.2}) contrast(${1.08 + rotationIntensity * 0.12})`,
            ...cardBackgroundWithLight,
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
          <div className={`flex flex-col w-full h-fit justify-center items-center gap-1 p-4 ${getFontClass()}`}
          style={{
            transform: `rotateZ(${-rotationZ}deg)`,
            transformOrigin: 'center center center',
            userSelect: 'none', // Prevent text selection while dragging
            color: activeScheme.text,
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
          
          {effectiveData.qrCodeSVG && (
            // <div
            //   className="w-fit h-fit flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full"
            //   dangerouslySetInnerHTML={{ __html: effectiveData.qrCodeSVG }}
            // />
            <img src={`data:image/svg+xml;utf8,${encodeURIComponent(effectiveData.qrCodeSVG)}`} alt="QR Code" />
          )}
          </div>

          {!isExporting ? (
            <>
              <div
                className="pointer-events-none absolute inset-0 z-20"
                style={{
                  backgroundImage: metallicSurfaceOverlay,
                  mixBlendMode: "soft-light",
                  opacity: 0.95,
                }}
              />

              <div
                className="pointer-events-none absolute inset-0 z-30"
                style={{
                  borderTop: `${borderTopRim}px solid rgba(255,255,255,${0.34 + rotationIntensity * 0.16})`,
                  borderBottom: `${borderBottomRim}px solid rgba(0,0,0,${0.26 + rotationIntensity * 0.12})`,
                  borderLeft: `${borderLeftRim}px solid rgba(255,255,255,${0.46 + rotationIntensity * 0.16})`,
                  borderRight: `${borderRightRim}px solid rgba(0,0,0,${0.34 + rotationIntensity * 0.18})`,
                  boxShadow: `inset ${normalizedTilt * -2.5}px 0 ${8 + rotationIntensity * 8}px rgba(255,255,255,${0.18 + rotationIntensity * 0.1}), inset ${normalizedTilt * 2.5}px 0 ${9 + rotationIntensity * 10}px rgba(0,0,0,${0.18 + rotationIntensity * 0.14})`,
                  mixBlendMode: "overlay",
                  borderRadius: "inherit",
                  opacity: resolvedBorderColor ? 0.95 : 0,
                }}
              />
            </>
          ) : null}
        </div>
      </div>
      {/* ButtonsObjects */}
      <div className="w-full no-print absolute bottom-2 left-0 px-3 space-y-2">
        <div className="rounded-md border border-white/20 bg-black/25 px-3 py-2 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-2 text-[10px] sm:text-xs text-neutral-200">
            <span>Tilt</span>
            <span>{rotationY.toFixed(0)}°</span>
          </div>
          <input
            type="range"
            min={-20}
            max={20}
            step={0.5}
            value={rotationY}
            onChange={handleSliderRotate}
            className="mt-1 h-1.5 w-full cursor-pointer accent-[#719169]"
            aria-label="Rotate card side to side"
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" className="w-full text-xs sm:text-sm" onClick={handleCardReset}>Reset Position</Button>
          <Button
                className="w-full h-full min-w-0 text-xs sm:text-sm"
                onClick={handleGenerateQRCode}
                disabled={isGeneratingQR}
                variant="outline"
              >Generate QR</Button>
          <Button variant="outline" className="w-full text-xs sm:text-sm" onClick={handleRotateImage}>Rotate</Button>
          <Button variant="outline" className="w-full text-xs sm:text-sm" onClick={handleDownloadImage}>Export</Button>
        </div>
      </div>
    </main>
  );
}
  