import React from "react";

export type ResumeData = {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string[];
  experience: string;
  education: string;
  projects?: string;
  certifications?: string;
};

export type ResumeStyleOptions = {
  fontFamily: "serif" | "sans" | "mono";
  density: "compact" | "comfortable" | "relaxed";
  headerStyle: "underline" | "boxed" | "minimal";
  accentColor: string;
  paperTone: "white" | "ivory" | "cool";
};

const defaultStyle: ResumeStyleOptions = {
  fontFamily: "serif",
  density: "comfortable",
  headerStyle: "underline",
  accentColor: "#111827",
  paperTone: "white",
};

const defaultResume: ResumeData = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  phone: "(555) 123-4567",
  location: "New York, NY",
  summary:
    "Results-driven professional with experience building user-focused products, leading cross-functional collaboration, and delivering measurable business impact.",
  skills: ["Leadership", "Communication", "Project Management", "React", "TypeScript"],
  experience:
    "Senior Product Engineer — Acme Corp (2022–Present)\n• Led feature delivery for core workflows used by 50k+ users\n• Improved performance and reduced load times by 35%\n• Partnered with design and product to increase activation by 18%",
  education:
    "B.S. in Computer Science — State University\nGraduated: 2020",
  projects:
    "Portfolio Website\n• Built a responsive portfolio with React and TypeScript\nTeam Dashboard\n• Created internal dashboards for weekly reporting",
  certifications: "AWS Certified Cloud Practitioner\nScrum Master (PSM I)",
};

function toBulletLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function cleanLine(line: string) {
  return line.replace(/^[-•*]\s*/, "").trim();
}

export function ResumePreview({ data, styleOptions, currentStep = 1 }: { data?: Partial<ResumeData>; styleOptions?: Partial<ResumeStyleOptions>; currentStep?: number }) {
  const resume: ResumeData = {
    ...defaultResume,
    ...data,
    skills:
      data?.skills && data.skills.length > 0 ? data.skills : defaultResume.skills,
  };

  const style = { ...defaultStyle, ...styleOptions };
  const fontClass = style.fontFamily === "sans" ? "font-sans" : style.fontFamily === "mono" ? "font-mono" : "font-serif";
  const sectionSpacingClass = style.density === "compact" ? "mb-1" : style.density === "relaxed" ? "mb-4" : "mb-2";
  const bodyLeadingClass = style.density === "compact" ? "leading-4" : style.density === "relaxed" ? "leading-6" : "leading-5";
  const sectionHeaderClass =
    style.headerStyle === "boxed"
      ? "text-[13px] font-bold uppercase tracking-[0.14em] text-neutral-900 bg-neutral-100 border border-neutral-300 px-2 py-1 mb-2"
      : style.headerStyle === "minimal"
      ? "text-[13px] font-bold uppercase tracking-[0.14em] text-neutral-900 mb-2"
      : "text-[13px] font-bold uppercase tracking-[0.16em] text-neutral-900 border-b pb-1 mb-2";

  const paperTone =
    style.paperTone === "ivory"
      ? "#fffdf2"
      : style.paperTone === "cool"
      ? "#f8fafc"
      : "#ffffff";

  const getPresetMinHeightClass = (sectionStep: number, sectionKind: "short" | "long" = "short") => {
    if (currentStep > sectionStep) return "";

    if (style.density === "compact") {
      return sectionKind === "long" ? "min-h-[110px]" : "min-h-[75px]";
    }

    if (style.density === "relaxed") {
      return sectionKind === "long" ? "min-h-[160px]" : "min-h-[110px]";
    }

    return sectionKind === "long" ? "min-h-[130px]" : "min-h-[90px]";
  };

  return (
    <div
      className={`mx-auto w-[816px] max-w-[816px] aspect-[1/1.294] border border-neutral-300 rounded-none shadow-none px-10 py-10 text-neutral-900 ${fontClass} flex flex-col`}
      style={{ backgroundColor: paperTone }}
    >
      <header data-resume-section="header" className="pb-3 mb-5 border-b" style={{ borderColor: style.accentColor }}>
        <h1 className="text-[34px] font-bold tracking-wide text-center uppercase leading-tight">{resume.name}</h1>
        <p className="text-[13px] text-neutral-700 mt-1 text-center">
          {resume.email} • {resume.phone} • {resume.location}
        </p>
      </header>

      <div className="flex flex-col flex-1">
      <section data-resume-section="summary" className={`${sectionSpacingClass} transition-[min-height] duration-300 ${getPresetMinHeightClass(2, "short")}`}>
        <h2 className={sectionHeaderClass} style={style.headerStyle === "underline" ? { borderColor: style.accentColor, color: style.accentColor } : { color: style.accentColor }}>
          Professional Summary
        </h2>
        <p className={`text-[13px] text-justify ${bodyLeadingClass}`}>{resume.summary}</p>
      </section>

      <section data-resume-section="skills" className={`${sectionSpacingClass} transition-[min-height] duration-300 ${getPresetMinHeightClass(3, "short")}`}>
        <h2 className={sectionHeaderClass} style={style.headerStyle === "underline" ? { borderColor: style.accentColor, color: style.accentColor } : { color: style.accentColor }}>
          Skills
        </h2>
        <p className="text-[13px]">{resume.skills.join(" • ")}</p>
      </section>

      <section data-resume-section="experience" className={`${sectionSpacingClass} transition-[min-height] duration-300 ${getPresetMinHeightClass(4, "long")}`}>
        <h2 className={sectionHeaderClass} style={style.headerStyle === "underline" ? { borderColor: style.accentColor, color: style.accentColor } : { color: style.accentColor }}>
          Experience
        </h2>
        <ul className={`list-disc pl-5 space-y-1 text-[13px] ${bodyLeadingClass}`}>
          {toBulletLines(resume.experience).map((line, index) => (
            <li key={`${line}-${index}`}>{cleanLine(line)}</li>
          ))}
        </ul>
      </section>

      <section data-resume-section="education" className={`${sectionSpacingClass} transition-[min-height] duration-300 ${getPresetMinHeightClass(5, "long")}`}>
        <h2 className={sectionHeaderClass} style={style.headerStyle === "underline" ? { borderColor: style.accentColor, color: style.accentColor } : { color: style.accentColor }}>
          Education
        </h2>
        <ul className={`list-disc pl-5 space-y-1 text-[13px] ${bodyLeadingClass}`}>
          {toBulletLines(resume.education).map((line, index) => (
            <li key={`${line}-${index}`}>{cleanLine(line)}</li>
          ))}
        </ul>
      </section>

      {resume.projects?.trim() ? (
        <section data-resume-section="projects" className={`${sectionSpacingClass} transition-[min-height] duration-300 ${getPresetMinHeightClass(6, "short")}`}>
          <h2 className={sectionHeaderClass} style={style.headerStyle === "underline" ? { borderColor: style.accentColor, color: style.accentColor } : { color: style.accentColor }}>
            Projects
          </h2>
          <ul className={`list-disc pl-5 space-y-1 text-[13px] ${bodyLeadingClass}`}>
            {toBulletLines(resume.projects).map((line, index) => (
              <li key={`${line}-${index}`}>{cleanLine(line)}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {resume.certifications?.trim() ? (
        <section data-resume-section="certifications">
          <h2 className={sectionHeaderClass} style={style.headerStyle === "underline" ? { borderColor: style.accentColor, color: style.accentColor } : { color: style.accentColor }}>
            Certifications
          </h2>
          <ul className={`list-disc pl-5 space-y-1 text-[13px] ${bodyLeadingClass}`}>
            {toBulletLines(resume.certifications).map((line, index) => (
              <li key={`${line}-${index}`}>{cleanLine(line)}</li>
            ))}
          </ul>
        </section>
      ) : null}
      </div>
    </div>
  );
}
