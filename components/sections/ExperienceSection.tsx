"use client";

import { useEffect, useState } from "react";
import { SectionWrapper } from "./section-wrapper";

type Item = {
  _id?: string;
  type: "experience" | "education";
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  description?: string;
  location?: string;
  order: number;
};

export function ExperienceSection() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch("/api/sections/resumes")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setItems(json.data || []);
      });
  }, []);

  // group by type
  const sections = [
    {
      type: "Experience",
      items: items.filter((i) => i.type === "experience"),
    },
    {
      type: "Education",
      items: items.filter((i) => i.type === "education"),
    },
  ];

  return (
    <SectionWrapper
      id="experience"
    
      title="Experience & Education"
      subtitle="A quick overview of my academic journey and professional experience."
    >
      <div className="flex py-4 flex-col gap-10 lg:flex-row lg:items-start">
        <div className="flex-1 space-y-8">
          {sections.map((group) => (
            <div key={group.type} className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                {group.type}
              </h3>

              <ol className="relative space-y-6 border-l border-border pl-5">
                {group.items.map((item, i) => (
                  <li key={item._id ?? i} className="relative">
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border border-border bg-background" />

                    <div className="rounded-xl border border-border bg-card p-4">
                      <p className="text-[11px] text-muted-foreground">
                        {item.startDate} - {item.endDate}
                      </p>

                      <h4 className="mt-1 text-sm font-semibold text-foreground">
                        {item.title}
                      </h4>

                      <p className="text-xs text-muted-foreground">
                        {item.organization}
                      </p>

                      {item.description && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}