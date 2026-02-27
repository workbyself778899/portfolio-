import { SectionWrapper } from "./section-wrapper";
import { FiDownload } from "react-icons/fi";

const RESUME_ITEMS = [
  {
    type: "Education",
    items: [
      {
        title: "BSc in Computer Science",
        org: "Your University",
        period: "2022 — Present",
        description:
          "Relevant coursework: Data Structures, Algorithms, Web Development, Databases, Operating Systems.",
      },
    ],
  },
  {
    type: "Experience",
    items: [
      {
        title: "Frontend Intern",
        org: "Tech Company",
        period: "Summer 2024",
        description:
          "Worked on responsive UI components, fixed bugs, and helped improve performance and accessibility.",
      },
    ],
  },
];

export function ResumeSection() {
  return (
    <SectionWrapper
      id="resume"
      eyebrow="Resume"
      title="Experience & education"
      subtitle="A quick overview of my academic journey and professional experience."
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="flex-1 space-y-6">
          {RESUME_ITEMS.map((group) => (
            <div key={group.type} className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {group.type}
              </h3>
              <ol className="relative space-y-4 border-l border-border pl-4">
                {group.items.map((item) => (
                  <li key={item.title}>
                    <div className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full border border-border bg-background" />
                    <p className="text-xs text-muted-foreground">{item.period}</p>
                    <p className="text-sm font-semibold text-foreground">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.org}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <div className="w-full max-w-xs space-y-4 rounded-2xl border border-border bg-card p-5 shadow-lg shadow-black/40">
          <h3 className="text-sm font-semibold text-foreground">
            Download CV
          </h3>
          <p className="text-xs text-muted-foreground">
            Need a PDF version of my resume? Download it and keep it for your
            reference.
          </p>
          <a href="/cv.pdf" download className="btn-primary w-full justify-center">
            <FiDownload className="h-4 w-4" />
            Download PDF
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}


