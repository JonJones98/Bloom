"use client";
import { Preview_Business_Card } from "@/components/preview";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function RenderBusinessCard() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
          console.log('Fetching business card with ID:', id);
          
          // Try different possible endpoints
          let response;
          const endpoints = [
            `${baseUrl}/db/business_card/get/${id}`
          ];
          
          let lastError;
          for (const endpoint of endpoints) {
            try {
              console.log('Trying endpoint:', endpoint);
              response = await fetch(endpoint);
              if (response.ok) break;
              lastError = `${endpoint}: ${response.status}`;
            } catch (err) {
              lastError = `${endpoint}: ${(err as Error).message}`;
            }
          }
          
          if (!response || !response.ok) {
            throw new Error(`All endpoints failed. Last error: ${lastError}`);
          }
          
          const data = await response.json();
          console.log('Fetched data:', data);
          
          // Extract the content from the response structure
          setFormData(data.content || data);
        } catch (error) {
          console.error("Error fetching card data:", error);
          setError(`Failed to load business card: ${(error as Error).message}`);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setError("No business card ID provided");
      setLoading(false);
    }
  }, [id]);

  return (
    <main className="flex items-start justify-start px-10 py-5 h-full w-full gap-10 bg-neutral-100 overflow-hidden">
      {/* Preview Section */}
      <div className="w-full p-6 bg-neutral-00 rounded-lg shadow-xl flex flex-col h-full max-h-full">
        <h2 className="text-2xl font-semibold mb-4">Business Card</h2>
        <div className="rounded-md flex-1 overflow-auto items-center justify-center flex">
          {loading ? (
            <div className="text-center">
              <p className="text-lg">Loading business card...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-600">
              <p className="text-lg">{error}</p>
              <p className="text-sm mt-2">ID: {id}</p>
            </div>
          ) : (
            <Preview_Business_Card data={formData} />
          )}
        </div>
      </div>
    </main>
  );
}
