"use client";

import { SectionWrapper } from "./section-wrapper";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FiGithub, FiLinkedin, FiX } from "react-icons/fi";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [data, setData] = useState<{
    email?: string;
    location?: string;
    contactText?: string;
    socialLinks?: { github?: string; linkedin?: string; twitter?: string };
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch contact data
  useEffect(() => {
    fetch("/api/sections/contact")
      .then(async (res) => {
        try {
          const json = await res.json();
          if (json.success && json.data) {
            setData(json.data);
          }
        } catch (err) {
          console.error("Invalid JSON response:", err);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch contact data:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const email = data?.email ?? "";
  const location = data?.location ?? "";
  const contactText = data?.contactText ?? "";
  const socialLinks = data?.socialLinks ?? {};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormState("submitting");
    setMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      let json;
      try {
        json = await res.json();
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) {
        throw new Error(json?.error || "Failed to send message");
      }

      setFormState("success");
      setMessage("Thanks for reaching out! I will get back to you soon.");
      form.reset();
    } catch (error) {
      console.error("Submit error:", error);
      setFormState("error");
      setMessage("Something went wrong. Please try again later.");
    } finally {
      timeoutRef.current = setTimeout(() => {
        setFormState("idle");
      }, 3000);
    }
  };

  const isSubmitting = formState === "submitting";

  const hasContactContent = !!(
    email ||
    location ||
    contactText ||
    socialLinks.github ||
    socialLinks.linkedin ||
    socialLinks.twitter
  );

  if (loading) {
    return (
      <SectionWrapper id="contact" eyebrow="Contact" title="..." subtitle="">
        <div className="flex min-h-[120px] items-center justify-center text-muted-foreground">
          Loading...
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      id="contact"
      eyebrow="Contact"
      title="Let’s build something"
      subtitle="Have a project in mind, an internship opportunity, or just want to say hi?"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        
        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-lg shadow-black/40"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1 block text-xs font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                aria-required="true"
                className="input"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-xs font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                aria-required="true"
                className="input"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-xs font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              aria-required="true"
              className="textarea"
              placeholder="Tell me about your project..."
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full"
            whileTap={{ scale: 0.97 }}
          >
            {isSubmitting ? "Sending..." : "Send message"}
          </motion.button>

          {message && (
            <p
              className={`text-xs mt-2 ${
                formState === "success"
                  ? "text-emerald-300"
                  : formState === "error"
                  ? "text-rose-300"
                  : "text-muted-foreground"
              }`}
            >
              {message}
            </p>
          )}
        </motion.form>

        {/* CONTACT INFO */}
        <div className="space-y-4">
          {hasContactContent ? (
            <>
              <div className="card">
                <h3 className="text-sm font-semibold">Contact details</h3>
                {contactText && <p className="text-xs">{contactText}</p>}
                {email && <p className="text-xs">Email: {email}</p>}
                {location && <p className="text-xs">Location: {location}</p>}
              </div>

              <div className="card">
                <h3 className="text-sm font-semibold">Social links</h3>
                <div className="flex gap-3">
                  {socialLinks.github && (
                    <a href={socialLinks.github} target="_blank">
                      <FiGithub />
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank">
                      <FiLinkedin />
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a href={socialLinks.twitter} target="_blank">
                      <FiX />
                    </a>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="card">
              <p>No contact details yet.</p>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}