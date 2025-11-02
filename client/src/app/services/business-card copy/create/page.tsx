"use client";
import { Preview_Business_Card } from "@/components/preview";
import { Button } from "@/components/ui/button";
import { useBusinessCardForm } from "@/contexts/business-card-form-context";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/contexts/buttonVariants";

const styleOptions = {
  cardStyle: [
    { value: 'modern', label: 'Modern', description: 'Clean lines and contemporary design' },
    { value: 'classic', label: 'Classic', description: 'Traditional and timeless' },
    { value: 'minimal', label: 'Minimal', description: 'Simple and elegant' },
    { value: 'creative', label: 'Creative', description: 'Bold and artistic' },
  ],
  colorScheme: [
    { value: 'blue', label: 'Professional Blue' },
    { value: 'green', label: 'Nature Green' },
    { value: 'purple', label: 'Creative Purple' },
    { value: 'orange', label: 'Energetic Orange' },
    { value: 'black', label: 'Classic Black' },
  ],
  fontStyle: [
    { value: 'sans', label: 'Sans Serif', description: 'Clean and modern' },
    { value: 'serif', label: 'Serif', description: 'Traditional and elegant' },
    { value: 'mono', label: 'Monospace', description: 'Technical and unique' },
  ],
};

export default function Home() {
  // State to hold form data
const { 
    formData,
    updateFormData
  } = useBusinessCardForm();
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [currentStep, setCurrentStep] = useState('content');
  const router = useRouter();
  console.log(formData);

  const handleCreateCard = () => {
    // Logic to handle business card creation can be added here
    if (currentStep === 'content') setCurrentStep('styling');
    else if (currentStep === 'styling'){
      // Save business card data to API
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      fetch(`${baseUrl}/db/business_card/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          type: "business-card",
          content: { ...formData }
        }),
      })
      .then(res => {
        if (!res.ok) throw new Error(`Server responded with status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Backend response:', data);
        alert("Business Card Created!");
        router.push('/services/business-card/render?id=' + data.id);
      })
      .catch(error => {
        console.error('Fetch error details:', error);
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
          alert(`Cannot connect to server at ${baseUrl}. Please check if your backend server is running.`);
        } else {
          alert(`Error saving business card: ${error.message}`);
        }
      });
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
    <main className="flex flex-col lg:flex-row sm:flex-col md:flex-col items-start justify-start px-10 py-5 h-full w-full gap-10 bg-neutral-100">
      {/* Preview Section */}
      <div className="w-full p-6 bg-neutral-00 rounded-lg shadow-xl flex flex-col h-full max-h-full min-h-[100%] bg-white gap-2">
        <h2 className="text-2xl font-semibold mb-4">Business Card Preview</h2>
        <div className=" rounded-md flex-1 items-center justify-center flex">
          <Preview_Business_Card data={{
    name: formData.name || "John Doe",
    email: formData.email || "john.doe@example.com",
    title: formData.title || "Software Engineer",
    company: formData.company || "Your Company Name",
    phone: formData.phone || "(XXX) XXX-XXXX",
    link: formData.link || "https://your-link.com",
    qrCodeSVG: formData.qrCodeSVG || "",
    isPreviewRender: true,
    isRotate: false,
    cardStyle: formData.cardStyle,
    colorScheme: formData.colorScheme,
    fontStyle: formData.fontStyle,
    backgroundStyle: formData.backgroundStyle,
    borderStyle: formData.borderStyle,
  }} />
        </div>
      </div>
      {/* Form Section */}
        {/* Content Section */}
        {currentStep == 'content' && (
      <div className="w-full p-6 bg-white rounded-lg shadow-xl flex flex-col h-full max-h-full min-w-fit">
        <h2 className="text-2xl font-semibold mb-4">
          Create Your Business Card
        </h2>
        <form className="space-y-4 overflow-auto flex-1">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => updateFormData("name", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Software Engineer"
              value={formData.title}
              onChange={(e) => updateFormData("title", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Your Company Name"
              value={formData.company}
              onChange={(e) => updateFormData("company", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="(XXX) XXX-XXXX"
              value={formData.phone}
              onChange={(e) => updateFormData("phone", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Link
            </label>
            <div className="flex flex-row mt-1 w-full h-fit border border-gray-300 rounded-md shadow-sm justify-between">
              <input
              type="text"
              className=" w-full pl-2"
              placeholder="https://your-link.com"
              value={formData.link}
              onChange={(e) => updateFormData("link", e.target.value)}
            />
            <Button
              className="w-1/4 h-full min-w-fit"
              onClick={handleGenerateQRCode}
              disabled={isGeneratingQR}
              variant="outline"
            >
              {isGeneratingQR ? "Generating QR Code..." : "Generate QR Code"}
            </Button>
            </div>
            
          </div>
          <div className="flex flex-row w-full justify-evenly">

            <Button className="w-full mt-4" onClick={handleCreateCard}>
              Styling Business Card
            </Button>
          </div>
        </form>
      </div>
        )}
        {/* Styling Section */}
        {currentStep == 'styling' && (
      <div className="w-full p-6 bg-white rounded-lg shadow-xl flex flex-col h-full max-h-full">
        <div className="flex flex-row justify-between items-center h-fit">
        <h2 className="text-2xl font-semibold mb-4">
          Style Your Business Card
        </h2>
        <Button variant={"outline"} className="w-fit" onClick={()=> {setCurrentStep('content')}}>
              Back to Content
            </Button>
            </div>
        <form className="space-y-4 overflow-auto flex-1">
          <div>
                  <label className="block text-lg font-medium text-gray-700 mb-4">Card Style</label>
                  <div className="grid grid-cols-2 gap-4">
                    {styleOptions.cardStyle.map((style) => (
                      <div
                        key={style.value}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.cardStyle === style.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => updateFormData('cardStyle', style.value)}
                      >
                        <h3 className="font-semibold text-gray-800">{style.label}</h3>
                        <p className="text-sm text-gray-600">{style.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
{/* Color Scheme */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-4"> Background Color Scheme</label>
                  <div className="grid grid-cols-1 gap-3">
                      <div
                        className={`flex items-center gap-3  cursor-pointer transition-all`}
                      >
                        <input
                          type="color"
                          value={formData.backgroundStyle[1]}
                          onChange={(e) =>  updateFormData('backgroundStyle', ["color", e.target.value])}
                          
                          className={`h-full w-full border-2 rounded-lg cursor-pointer transition-all ${
                          formData.backgroundStyle[0] === 'color'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        />
                        <input
                          type="file"
                          accept="image/*"
                          id="background-image-input"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                updateFormData('backgroundStyle', ["image", reader.result as string]);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className={`p-4 w-full border-2 rounded-lg cursor-pointer transition-all ${
                          formData.backgroundStyle[0] === 'image'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        />
                      </div>
                  </div>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-4"> Border Color Scheme</label>
                  <div className="grid grid-cols-1 gap-3">
                      <div
                        className={`flex items-center gap-3 cursor-pointer transition-all`}
                      >
                        <input
                          type="color"
                          className={`h-full w-full border-2 rounded-lg cursor-pointer transition-all ${
                          formData.borderStyle !== ''
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                          value={formData.borderStyle}
                          onChange={(e) =>  updateFormData('borderStyle', e.target.value)}
                        />
                        <input
                          id="no-border-checkbox"
                          type="button"
                          className={`p-4 w-full border-2 rounded-lg cursor-pointer transition-all ${
                          formData.borderStyle === ''
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                          value={"No Border"}
                          checked={formData.borderStyle === ''}
                          onClick={() => updateFormData('borderStyle', '')}
                        />
                      </div>
                  </div>
                </div>
                {/* Font Style */}
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-4">Font Style</label>
                  <div className="grid grid-cols-1 gap-3">
                    {styleOptions.fontStyle.map((font) => (
                      <div
                        key={font.value}
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.fontStyle === font.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => updateFormData('fontStyle', font.value)}
                      >
                        <h3 className={`font-semibold text-gray-800 ${
                          font.value === 'serif' ? 'font-serif' : 
                          font.value === 'mono' ? 'font-mono' : 'font-sans'
                        }`}>{font.label}</h3>
                        <p className="text-sm text-gray-600">{font.description}</p>
                      </div>
                    ))}
                  </div>
                  <label className="block text-lg font-medium text-gray-700 mb-4">Font Size</label>
                  <div className="grid grid-cols-1 gap-3">
                  </div>
                </div>
          <div className="flex flex-row w-full justify-evenly">
            <Button className="w-full" onClick={handleCreateCard}>
              Save Business Card
            </Button>
          </div>
        </form>
      </div>
        )}
    </main> 
  );
}
