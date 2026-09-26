"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumePreview, type ResumeData } from "@/components/resume-preview";

const emptyResume: ResumeData = {
  name: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  skills: [],
  experience: "",
  education: "",
};

export default function UpdateResumePage() {
  const [id, setId] = useState("");
  const [resumeData, setResumeData] = useState<ResumeData>(emptyResume);
  const [skillsInput, setSkillsInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  const handleLoad = async () => {
    if (!id.trim()) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${baseUrl}/db/resume?id=${id.trim()}`);
      if (!response.ok) throw new Error(`Server responded with ${response.status}`);

      const data = await response.json();
      const content = data?.resume?.content;

      if (!content) {
        throw new Error("Resume not found.");
      }

      setResumeData({ ...emptyResume, ...content });
      setSkillsInput(Array.isArray(content.skills) ? content.skills.join(", ") : "");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!id.trim()) return;

    try {
      setSaving(true);
      setError("");

      const payload: ResumeData = {
        ...resumeData,
        skills: skillsInput
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      const response = await fetch(`${baseUrl}/db/resume/update?id=${id.trim()}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name,
          type: "resume",
          content: payload,
        }),
      });

      if (!response.ok) throw new Error(`Server responded with ${response.status}`);

      alert("Resume updated successfully.");
      setResumeData(payload);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const updateField = <K extends keyof ResumeData>(field: K, value: ResumeData[K]) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main className="flex flex-col lg:flex-row items-start justify-start px-6 lg:px-10 py-6 h-full w-full gap-8 bg-neutral-100">
      <div className="w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-xl space-y-4">
        <h2 className="text-2xl font-semibold">Update Resume</h2>

        <div className="flex gap-2">
          <Input value={id} onChange={(e) => setId(e.target.value)} placeholder="resume_<id>" />
          <Button onClick={handleLoad} disabled={loading || !id.trim()}>
            {loading ? "Loading..." : "Load"}
          </Button>
        </div>

        <Input value={resumeData.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Full Name" />
        <Input type="email" value={resumeData.email} onChange={(e) => updateField("email", e.target.value)} placeholder="Email" />
        <Input value={resumeData.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="Phone" />
        <Input value={resumeData.location} onChange={(e) => updateField("location", e.target.value)} placeholder="Location" />

        <Input
          value={skillsInput}
          onChange={(e) => setSkillsInput(e.target.value)}
          placeholder="Skills (comma separated)"
        />

        <textarea
          className="w-full min-h-24 rounded-md border border-gray-300 p-2 text-sm"
          value={resumeData.summary}
          onChange={(e) => updateField("summary", e.target.value)}
          placeholder="Summary"
        />
        <textarea
          className="w-full min-h-28 rounded-md border border-gray-300 p-2 text-sm"
          value={resumeData.experience}
          onChange={(e) => updateField("experience", e.target.value)}
          placeholder="Experience"
        />
        <textarea
          className="w-full min-h-24 rounded-md border border-gray-300 p-2 text-sm"
          value={resumeData.education}
          onChange={(e) => updateField("education", e.target.value)}
          placeholder="Education"
        />

        <Button className="w-full" onClick={handleSave} disabled={saving || !id.trim()}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>

        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      <div className="w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">Preview</h2>
        <div className="rounded-md overflow-auto max-h-[75vh]">
          <ResumePreview
            data={{
              ...resumeData,
              skills: skillsInput
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean),
            }}
          />
        </div>
      </div>
    </main>
  );
}
