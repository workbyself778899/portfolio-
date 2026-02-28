import { notFound } from "next/navigation";
import { AdminPanel } from "../AdminPanel";

const VALID_SECTIONS = ["home", "about", "skills", "projects", "resumes", "contact", "messages"] as const;

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!VALID_SECTIONS.includes(section as (typeof VALID_SECTIONS)[number])) {
    notFound();
  }
  return <AdminPanel />;
}
