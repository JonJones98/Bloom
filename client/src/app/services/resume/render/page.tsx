"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ResumePreview, type ResumeData } from "@/components/resume-preview";

export default function RenderResumePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResume = async () => {
      if (!id) {
        setError("No resume ID provided. Use ?id=<resume_id>.");
        setLoading(false);
        return;
      }

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/db/resume?id=${id}`);

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();
        const payload = data?.resume?.content || data?.content || null;

        if (!payload) {
          throw new Error("Resume content not found.");
        }

        setResume(payload);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(`Failed to load resume: ${message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  return (
    <main className="flex items-start justify-start px-6 lg:px-10 py-6 h-full w-full gap-8 bg-neutral-100">
      <div className="w-full p-6 bg-white rounded-lg shadow-xl min-h-[70vh]">
        <h2 className="text-2xl font-semibold mb-4">Resume</h2>

        {loading ? (
          <p className="text-neutral-600">Loading resume...</p>
        ) : error ? (
          <div className="text-red-600">
            <p>{error}</p>
            {id && <p className="text-sm mt-2">ID: {id}</p>}
          </div>
        ) : (
          <ResumePreview data={resume || undefined} />
        )}
      </div>
    </main>
  );
}
