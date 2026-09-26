"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumePreview, type ResumeData, type ResumeStyleOptions } from "@/components/resume-preview";

const initialFormData: ResumeData = {
  name: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  skills: [],
  experience: "",
  education: "",
  projects: "",
  certifications: "",
};

const steps = [
  "Personal Details",
  "Professional Summary",
  "Core Skills",
  "Work Experience",
  "Education",
  "Projects & Certifications",
  "Styling",
  "Review & Finish",
] as const;

export default function CreateResumePage() {
  const router = useRouter();
  const previewViewportRef = useRef<HTMLDivElement>(null);
  const previewPaperRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<ResumeData>(initialFormData);
  const [styleOptions, setStyleOptions] = useState<ResumeStyleOptions>({
    fontFamily: "serif",
    density: "comfortable",
    headerStyle: "underline",
    accentColor: "#111827",
    paperTone: "white",
  });
  const [fitPreviewScale, setFitPreviewScale] = useState(0.86);
  const [isSaving, setIsSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const canSave = useMemo(() => {
    return Boolean(
      formData.name.trim() &&
      formData.email.trim() &&
      formData.summary.trim() &&
      toLines(formData.experience).length > 0 &&
      toLines(formData.education).length > 0
    );
  }, [formData]);

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return Boolean(formData.name.trim() && formData.email.trim());
      case 2:
        return Boolean(formData.summary.trim());
      case 3:
        return Boolean(formData.skills.length > 0);
      case 4:
        return Boolean(formData.experience.trim());
      case 5:
        return Boolean(formData.education.trim());
      case 6:
        return true;
      case 7:
        return true;
      case 8:
        return canSave;
      default:
        return false;
    }
  };

  const updateField = <K extends keyof ResumeData>(
    field: K,
    value: ResumeData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  function toLines(value: string) {
    return value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }

  const updateTextListField = (field: keyof Pick<ResumeData, "experience" | "education" | "projects" | "certifications">, lines: string[]) => {
    updateField(field, lines.filter(Boolean).join("\n"));
  };

  const updateLineAtIndex = (
    field: keyof Pick<ResumeData, "experience" | "education" | "projects" | "certifications">,
    index: number,
    value: string
  ) => {
    const lines = toLines((formData[field] || "") as string);
    lines[index] = value;
    updateTextListField(field, lines);
  };

  const addLine = (field: keyof Pick<ResumeData, "experience" | "education" | "projects" | "certifications">) => {
    const lines = toLines((formData[field] || "") as string);
    lines.push("");
    updateTextListField(field, lines);
  };

  const removeLine = (
    field: keyof Pick<ResumeData, "experience" | "education" | "projects" | "certifications">,
    index: number
  ) => {
    const lines = toLines((formData[field] || "") as string);
    lines.splice(index, 1);
    updateTextListField(field, lines);
  };

  const updateSkillAtIndex = (index: number, value: string) => {
    const nextSkills = [...formData.skills];
    nextSkills[index] = value;
    updateField(
      "skills",
      nextSkills.map((skill) => skill.trim()).filter(Boolean)
    );
  };

  const addSkill = () => updateField("skills", [...formData.skills, ""]);

  const removeSkill = (index: number) => {
    const nextSkills = [...formData.skills];
    nextSkills.splice(index, 1);
    updateField("skills", nextSkills);
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(8, prev + 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleCreateResume = async () => {
    if (!canSave || isSaving) return;

    setIsSaving(true);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

    try {
      const response = await fetch(`${baseUrl}/db/resume/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          type: "resume",
          content: formData,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      alert("Resume created successfully.");

      if (data?.id) {
        router.push(`/services/resume/render?id=${data.id}`);
        return;
      }

      router.push("/services/resume");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      alert(`Failed to create resume: ${message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const panelTitle =
    currentStep === 1
      ? "Header"
      : currentStep === 2
      ? "Summary"
      : currentStep === 3
      ? "Skills and Software Proficiencies"
      : currentStep === 4
      ? "Experience"
      : currentStep === 5
      ? "Education"
      : currentStep === 6
      ? "Projects & Certification"
      : currentStep === 7
      ? "Styling"
      : "Review";

  const activePreviewFocus = currentStep <= 6
    ? { scale: 1.2, translateY: 0 }
    : { scale: fitPreviewScale, translateY: 0 };
  const previewSectionByStep: Partial<Record<number, string>> = {
    1: "header",
    2: "summary",
    3: "skills",
    4: "experience",
    5: "education",
    6: "projects",
    7: "header",
    8: "header",
  };

  useEffect(() => {
    const viewport = previewViewportRef.current;
    if (!viewport) return;

    const sectionKey = previewSectionByStep[currentStep];
    if (!sectionKey) return;
    const target = viewport.querySelector<HTMLElement>(`[data-resume-section="${sectionKey}"]`);
    if (!target) {
      viewport.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const nextTop = Math.max(0, target.offsetTop - 8);
    viewport.scrollTo({
      top: nextTop,
      behavior: "smooth",
    });
  }, [currentStep]);

  useEffect(() => {
    const recalcPreviewScale = () => {
      if (currentStep < 7) return;
      const viewport = previewViewportRef.current;
      const paper = previewPaperRef.current;
      if (!viewport || !paper) return;

      const widthScale = (viewport.clientWidth - 16) / paper.offsetWidth;
      const heightScale = (viewport.clientHeight - 16) / paper.offsetHeight;
      const fitScale = Math.min(widthScale, heightScale);
      setFitPreviewScale(Math.max(0.45, Math.min(1, fitScale)));
    };

    const frame = window.requestAnimationFrame(recalcPreviewScale);
    window.addEventListener("resize", recalcPreviewScale);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", recalcPreviewScale);
    };
  }, [currentStep, formData, styleOptions]);

  return (
    <main className="h-full w-full bg-gradient-to-br from-[#FEBC2F]/15 via-white to-[#FEBC2F]/5 p-4 lg:p-6 overflow-hidden flex flex-col">
      <h1 className="text-3xl font-bold mb-2 text-[#EDAE28]">Resume</h1>
      <div className="w-full rounded-lg p-0 shadow-lg flex-1 min-h-0">
      <section className="w-full rounded-lg border-[3px] border-[#FEBC2F] bg-gradient-to-br from-gray-900 via-gray-800 to-black p-3 h-full min-h-0 overflow-hidden shadow-[0_0_0_2px_rgba(254,188,47,0.2)]">

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-12 lg:h-full min-h-0">
          <div className="lg:col-span-7 rounded-sm p-2 flex flex-col lg:h-full min-h-0 overflow-hidden">
            <div ref={previewViewportRef} className={`flex-1 min-h-0 overflow-x-hidden rounded-sm p-2 flex justify-center ${currentStep >= 7 ? "items-center overflow-hidden" : "items-start overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/35"}`}>
              <div
                ref={previewPaperRef}
                className={`${currentStep >= 7 ? "origin-center" : "origin-top"} w-fit mx-auto transition-transform duration-500 ease-in-out`}
                style={{
                  transform: `translateY(0px) scale(${activePreviewFocus.scale})`,
                }}
              >
                <ResumePreview data={formData} styleOptions={styleOptions} currentStep={currentStep} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-sm border border-[#FEBC2F] bg-[#efefef] p-2 grid grid-rows-[auto_minmax(0,1fr)_auto] lg:h-full min-h-0 overflow-hidden">
            <div className="mb-2 flex items-start justify-between">
              <h2 className="max-w-[80%] text-sm font-bold uppercase leading-tight text-neutral-900">
                {panelTitle}
              </h2>
              <span className="text-[10px] text-neutral-500">Part {currentStep} / {steps.length}</span>
            </div>

            <div className="space-y-2 min-h-0 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-400/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-neutral-400/60">
              {currentStep === 1 ? (
                <>
                  <Input
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Full Name"
                    className="h-8 bg-white text-xs"
                  />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="Email Address"
                    className="h-8 bg-white text-xs"
                  />
                  <Input
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="Phone"
                    className="h-8 bg-white text-xs"
                  />
                  <Input
                    value={formData.location}
                    onChange={(e) => updateField("location", e.target.value)}
                    placeholder="Location"
                    className="h-8 bg-white text-xs"
                  />
                </>
              ) : null}

              {currentStep === 2 ? (
                <textarea
                  className="min-h-40 w-full resize-none rounded-md border border-neutral-300 bg-white p-2 text-xs"
                  value={formData.summary}
                  onChange={(e) => updateField("summary", e.target.value)}
                  placeholder="Describe your profile in 3-4 lines"
                />
              ) : null}

              {currentStep === 3 ? (
                <>
                  {(formData.skills.length > 0 ? formData.skills : [""]).map((skill, index) => (
                    <div key={`skill-${index}`} className="flex items-center gap-2">
                      <Input
                        value={skill}
                        onChange={(e) => updateSkillAtIndex(index, e.target.value)}
                        placeholder={`Skill ${index + 1}`}
                        className="h-8 bg-white text-xs"
                      />
                      {(formData.skills.length > 1 || skill) && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => removeSkill(index)}
                          className="h-8 px-2 text-[10px]"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addSkill} className="h-8 w-full text-xs">
                    Add Skill
                  </Button>
                </>
              ) : null}

              {currentStep === 4 ? (
                <>
                  {(toLines(formData.experience).length > 0 ? toLines(formData.experience) : [""]).map(
                    (line, index) => (
                      <div key={`exp-${index}`} className="flex items-center gap-2">
                        <Input
                          value={line}
                          onChange={(e) => updateLineAtIndex("experience", index, e.target.value)}
                          placeholder={`Experience ${index + 1}`}
                          className="h-8 bg-white text-xs"
                        />
                        {(toLines(formData.experience).length > 1 || line) && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => removeLine("experience", index)}
                            className="h-8 px-2 text-[10px]"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    )
                  )}
                  <Button type="button" variant="outline" onClick={() => addLine("experience")} className="h-8 w-full text-xs">
                    Add
                  </Button>
                </>
              ) : null}

              {currentStep === 5 ? (
                <>
                  {(toLines(formData.education).length > 0 ? toLines(formData.education) : [""]).map(
                    (line, index) => (
                      <div key={`edu-${index}`} className="flex items-center gap-2">
                        <Input
                          value={line}
                          onChange={(e) => updateLineAtIndex("education", index, e.target.value)}
                          placeholder={`Education ${index + 1}`}
                          className="h-8 bg-white text-xs"
                        />
                        {(toLines(formData.education).length > 1 || line) && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => removeLine("education", index)}
                            className="h-8 px-2 text-[10px]"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    )
                  )}
                  <Button type="button" variant="outline" onClick={() => addLine("education")} className="h-8 w-full text-xs">
                    Add
                  </Button>
                </>
              ) : null}

              {currentStep === 6 ? (
                <>
                  <p className="text-[11px] font-semibold text-neutral-700">Projects</p>
                  {(toLines(formData.projects || "").length > 0 ? toLines(formData.projects || "") : [""]).map(
                    (line, index) => (
                      <div key={`proj-${index}`} className="flex items-center gap-2">
                        <Input
                          value={line}
                          onChange={(e) => updateLineAtIndex("projects", index, e.target.value)}
                          placeholder={`Project ${index + 1}`}
                          className="h-8 bg-white text-xs"
                        />
                        {(toLines(formData.projects || "").length > 1 || line) && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => removeLine("projects", index)}
                            className="h-8 px-2 text-[10px]"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    )
                  )}
                  <Button type="button" variant="outline" onClick={() => addLine("projects")} className="h-8 w-full text-xs">
                    Add Project
                  </Button>

                  <p className="pt-2 text-[11px] font-semibold text-neutral-700">Certification</p>
                  {(toLines(formData.certifications || "").length > 0
                    ? toLines(formData.certifications || "")
                    : [""]
                  ).map((line, index) => (
                    <div key={`cert-${index}`} className="flex items-center gap-2">
                      <Input
                        value={line}
                        onChange={(e) => updateLineAtIndex("certifications", index, e.target.value)}
                        placeholder={`Certification ${index + 1}`}
                        className="h-8 bg-white text-xs"
                      />
                      {(toLines(formData.certifications || "").length > 1 || line) && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => removeLine("certifications", index)}
                          className="h-8 px-2 text-[10px]"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addLine("certifications")}
                    className="h-8 w-full text-xs"
                  >
                    Add Certification
                  </Button>
                </>
              ) : null}

              {currentStep === 7 ? (
                <>
                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700">Template Font</label>
                    <select
                      className="mt-1 h-8 w-full rounded-md border border-neutral-300 bg-white px-2 text-xs"
                      value={styleOptions.fontFamily}
                      onChange={(e) => setStyleOptions((prev) => ({ ...prev, fontFamily: e.target.value as ResumeStyleOptions["fontFamily"] }))}
                    >
                      <option value="serif">Serif</option>
                      <option value="sans">Sans Serif</option>
                      <option value="mono">Monospace</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700">Content Density</label>
                    <select
                      className="mt-1 h-8 w-full rounded-md border border-neutral-300 bg-white px-2 text-xs"
                      value={styleOptions.density}
                      onChange={(e) => setStyleOptions((prev) => ({ ...prev, density: e.target.value as ResumeStyleOptions["density"] }))}
                    >
                      <option value="compact">Compact</option>
                      <option value="comfortable">Comfortable</option>
                      <option value="relaxed">Relaxed</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700">Section Header Style</label>
                    <select
                      className="mt-1 h-8 w-full rounded-md border border-neutral-300 bg-white px-2 text-xs"
                      value={styleOptions.headerStyle}
                      onChange={(e) => setStyleOptions((prev) => ({ ...prev, headerStyle: e.target.value as ResumeStyleOptions["headerStyle"] }))}
                    >
                      <option value="underline">Underline</option>
                      <option value="boxed">Boxed</option>
                      <option value="minimal">Minimal</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700">Accent Color</label>
                    <div className="mt-1 flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-2 py-1.5">
                      <input
                        type="color"
                        className="h-5 w-5"
                        value={styleOptions.accentColor}
                        onChange={(e) => setStyleOptions((prev) => ({ ...prev, accentColor: e.target.value }))}
                      />
                      <span className="text-xs text-neutral-600">{styleOptions.accentColor.toUpperCase()}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-neutral-700">Paper Tone</label>
                    <select
                      className="mt-1 h-8 w-full rounded-md border border-neutral-300 bg-white px-2 text-xs"
                      value={styleOptions.paperTone}
                      onChange={(e) => setStyleOptions((prev) => ({ ...prev, paperTone: e.target.value as ResumeStyleOptions["paperTone"] }))}
                    >
                      <option value="white">White</option>
                      <option value="ivory">Ivory</option>
                      <option value="cool">Cool Gray</option>
                    </select>
                  </div>
                </>
              ) : null}

              {currentStep === 8 ? (
                <div className="rounded-md border border-neutral-300 bg-white p-3">
                  <p className="text-xs text-neutral-700">
                    Review the resume on the left. Save when ready.
                  </p>
                </div>
              ) : null}
            </div>

            <div className="mt-2 shrink-0 flex items-center justify-between gap-2 border-t border-neutral-300 pt-2">
              <div className="flex gap-1.5">
                {steps.map((_, index) => {
                  const step = index + 1;
                  const active = step === currentStep;
                  const complete = isStepComplete(step);
                  return (
                    <button
                      key={`dot-${step}`}
                      type="button"
                      onClick={() => setCurrentStep(step)}
                      className={`h-2 w-2 rounded-full ${
                        active ? "bg-[#FEBC2F]" : complete ? "bg-neutral-500" : "bg-neutral-300"
                      }`}
                      aria-label={`Go to part ${step}`}
                    />
                  );
                })}
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="h-8 px-3 text-xs"
                  onClick={currentStep === 1 ? () => router.push("/services/resume") : handleBack}
                  disabled={isSaving}
                >
                  {currentStep === 1 ? "Cancel" : "Back"}
                </Button>
                {currentStep < 8 ? (
                  <Button
                    type="button"
                    className="h-8 px-3 text-xs bg-[#FEBC2F] text-black hover:bg-[#f3b31f]"
                    onClick={handleNext}
                    disabled={isSaving}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className="h-8 px-3 text-xs bg-[#FEBC2F] text-black hover:bg-[#f3b31f]"
                    onClick={handleCreateResume}
                    disabled={!canSave || isSaving}
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </main>
  );
}
