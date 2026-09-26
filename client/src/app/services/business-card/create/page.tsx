"use client";
import { Preview_Business_Card } from "@/components/preview";
import { Button } from "@/components/ui/button";
import { useBusinessCardForm } from "@/contexts/business-card-form-context";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
const {
    formData,
    updateFormData
  } = useBusinessCardForm();
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const router = useRouter();
  console.log(formData);

  const handleCreateCard = () => {
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
    <main className="h-full w-full bg-gradient-to-br from-[#719169]/15 via-white to-[#719169]/5 p-4 lg:p-6 overflow-hidden flex flex-col">
      <h1 className="text-3xl font-bold mb-2 text-[#719169]">Business Card</h1>

      <div className="w-full rounded-lg p-0 shadow-lg flex-1 min-h-0">
        <div className="rounded-lg border-[3px] border-[#719169] bg-gradient-to-br from-gray-900 via-gray-800 to-black p-3 h-full shadow-[0_0_0_2px_rgba(113,145,105,0.2)]">
          <div className="flex flex-col lg:flex-row gap-3 h-full">
            <div className="w-full flex flex-col rounded-md bg-transparent">
              <div className="flex-1 flex items-center justify-center">
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

            <div className="w-full lg:w-[320px] rounded-md border border-[#719169] bg-[#ececec] p-3 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold">Styles</p>
              </div>

              <div className="pb-2 border-b border-black/20">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold">Presets</p>
                  <span className="text-xl leading-none">+</span>
                </div>
                <select
                  className="mt-2 w-full border rounded-md p-2 text-xs bg-white"
                  value={formData.cardStyle}
                  onChange={(e) => updateFormData('cardStyle', e.target.value)}
                >
                  {styleOptions.cardStyle.map((style) => (
                    <option key={style.value} value={style.value}>{style.label}</option>
                  ))}
                </select>
                <select
                  className="mt-2 w-full border rounded-md p-2 text-xs bg-white"
                  value={formData.colorScheme}
                  onChange={(e) => updateFormData('colorScheme', e.target.value)}
                >
                  {styleOptions.colorScheme.map((scheme) => (
                    <option key={scheme.value} value={scheme.value}>{scheme.label}</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 pb-2 border-b border-black/20 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Typography</p>
                  <span className="text-xl leading-none">+</span>
                </div>
                <select
                  className="w-full border rounded-md p-1.5 text-xs bg-white"
                  value={formData.fontStyle}
                  onChange={(e) => updateFormData('fontStyle', e.target.value)}
                >
                  {styleOptions.fontStyle.map((font) => (
                    <option key={font.value} value={font.value}>{font.label}</option>
                  ))}
                </select>
                <div>
                  <label className="text-xs">Font</label>
                  <input className="w-full border rounded-md p-1.5 text-xs bg-white" value={formData.fontStyle === 'sans' ? 'Inter' : formData.fontStyle === 'serif' ? 'Serif' : 'Monospace'} readOnly />
                </div>
                <div>
                  <label className="text-xs">Weight</label>
                  <input className="w-full border rounded-md p-1.5 text-xs bg-white" value="Regular" readOnly />
                </div>
                <div>
                  <label className="text-xs">Size</label>
                  <input className="w-full border rounded-md p-1.5 text-xs bg-white" value="10" readOnly />
                </div>
                <div>
                  <label className="text-xs">Border Color</label>
                  <div className="mt-1 flex items-center gap-1 border rounded-md p-1.5 bg-white">
                    <input
                      type="color"
                      className="h-4 w-4"
                      value={formData.borderStyle || '#000000'}
                      onChange={(e) => updateFormData('borderStyle', e.target.value)}
                    />
                    <input className="w-full text-xs outline-none" value={(formData.borderStyle || '#000000').replace('#', '').toUpperCase()} readOnly />
                    <span className="text-xs border-l pl-1">100%</span>
                    <span className="text-xs">◉</span>
                    <span className="text-xs">−</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 pb-2 border-b border-black/20 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Background</p>
                  <span className="text-xl leading-none">+</span>
                </div>
                <div>
                  <label className="text-xs">Fill</label>
                  <div className="mt-1 flex items-center gap-1 border rounded-md p-1.5 bg-white">
                    <input
                      type="color"
                      className="h-4 w-4"
                      value={formData.backgroundStyle?.[1] || '#f0f0f0'}
                      onChange={(e) => updateFormData('backgroundStyle', ["color", e.target.value])}
                    />
                    <input className="w-full text-xs outline-none" value={(formData.backgroundStyle?.[1] || '#f0f0f0').replace('#', '').toUpperCase()} readOnly />
                    <span className="text-xs border-l pl-1">100%</span>
                    <span className="text-xs">◉</span>
                    <span className="text-xs">−</span>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Border</p>
                  <span className="text-xl leading-none">+</span>
                </div>
                <Button type="button" className="w-full mt-3" onClick={handleCreateCard}>Save Business Card</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
