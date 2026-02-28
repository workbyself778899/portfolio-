"use client";

import { SectionWrapper } from "./section-wrapper";
import { FiDownload } from "react-icons/fi";
import { useEffect, useState } from "react";

type ResumeItem = { title: string; org: string; period: string; description: string };
type ResumeGroup = { type: string; items: ResumeItem[] };

export function ResumeSection() {
  const [data, setData] = useState<{
    sections?: ResumeGroup[];
    cvUrl?: string;
    downloadText?: string;
    description?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sections/resumes")
      .then((res) => res.json())
      .then((json) => json.success && json.data && setData(json.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <SectionWrapper id="resume" eyebrow="Resume" title="..." subtitle="">
        <div className="flex min-h-[120px] items-center justify-center text-muted-foreground">Loading...</div>
      </SectionWrapper>
    );
  }

  if (!data) {
    return (
      <SectionWrapper id="resume" eyebrow="Resume" title="Experience & education" subtitle="">
        <p className="text-sm text-muted-foreground">No content yet. Add content from the admin panel.</p>
      </SectionWrapper>
    );
  }

  const sections = Array.isArray(data.sections) ? data.sections : [];
  const cvUrl = data.cvUrl ?? "#";
  const downloadText = data.downloadText ?? "Download PDF";
  const downloadDescription = data.description ?? "";

  if (sections.length === 0 && !downloadText) {
    return (
      <SectionWrapper id="resume" eyebrow="Resume" title="Experience & education" subtitle="">
        <p className="text-sm text-muted-foreground">No content yet. Add content from the admin panel.</p>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      id="resume"
      eyebrow="Resume"
      title="Experience & education"
      subtitle="A quick overview of my academic journey and professional experience."
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {sections.length > 0 && (
          <div className="flex-1 space-y-6">
            {sections.map((group) => (
              <div key={group.type} className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {group.type}
                </h3>
                <ol className="relative space-y-4 border-l border-border pl-4">
                  {(group.items ?? []).map((item) => (
                    <li key={item.title}>
                      <div className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full border border-border bg-background" />
                      <p className="text-xs text-muted-foreground">{item.period}</p>
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.org}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        )}

        <div className="w-full max-w-xs space-y-4 rounded-2xl border border-border bg-card p-5 shadow-lg shadow-black/40">
          <h3 className="text-sm font-semibold text-foreground">Download CV</h3>
          {downloadDescription && <p className="text-xs text-muted-foreground">{downloadDescription}</p>}
          <a href={cvUrl} download className="btn-primary w-full justify-center">
            <FiDownload className="h-4 w-4" />
            {downloadText}
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}


