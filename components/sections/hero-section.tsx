"use client";

import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { SectionWrapper } from "./section-wrapper";
import { FiX } from "react-icons/fi";

export function HeroSection() {
  const [data, setData] = useState<{
    greeting?: string;
    s_intro?: string;
    intro?: string;
    message?: string;
    title?: string;
    describe?: string;
    tag?: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("/api/sections/home").then((res: AxiosResponse<any>) => {
      setData(res.data);
      console.log(data)
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <SectionWrapper id="home" eyebrow="Welcome" title="..." subtitle="">
        <div className="flex min-h-50 items-center justify-center text-muted-foreground">
          Loading...
        </div>
      </SectionWrapper>
    );
  }

  if (!data?.title) {
    return (
      <SectionWrapper id="home" eyebrow="Welcome" title="Home" subtitle="">
        <p className="text-sm text-muted-foreground">
          No content yet. Add content from the admin panel.
        </p>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      id="home"
      eyebrow={data.greeting ?? data.message}
      title={data.title}
      subtitle={data.describe}
    >
      <div className="space-y-4">
        {data.intro && <h2 className="text-2xl font-bold">{data.intro}</h2>}
        {data.s_intro && <p className="text-base text-muted-foreground">{data.s_intro}</p>}
        {data.message && <p className="text-base text-muted-foreground">{data.message}</p>}
        {data.tag && data.tag.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {data.tag.map((t) => (
              <span key={t} className="badge">{t}</span>
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
// End of HeroSection function
}