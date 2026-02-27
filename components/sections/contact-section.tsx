"use client";
import { SectionWrapper } from "./section-wrapper";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setFormState("submitting");
    setMessage(null);

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

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setFormState("success");
      setMessage("Thanks for reaching out! I will get back to you soon.");
    } catch (error) {
      console.error(error);
      setFormState("error");
      setMessage("Something went wrong. Please try again later.");
    } finally {
      setTimeout(() => {
        setFormState("idle");
      }, 3000);
    }
  };

  const isSubmitting = formState === "submitting";

  return (
    <SectionWrapper
      id="contact"
      eyebrow="Contact"
      title="Let’s build something"
      subtitle="Have a project in mind, an internship opportunity, or just want to say hi? Fill out the form or reach me directly."
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <motion.form
          action={handleSubmit}
          className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-lg shadow-black/40"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-xs font-medium text-foreground"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="input"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-xs font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-xs font-medium text-foreground"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              className="textarea"
              placeholder="Tell me a bit about your project, idea, or question..."
            />
          </div>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full justify-center"
            whileTap={{ scale: 0.97 }}
          >
            {isSubmitting ? "Sending..." : "Send message"}
          </motion.button>

          {message && (
            <p
              className={`mt-2 text-xs ${
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

        <div className="space-y-4">
          <div className="card space-y-2">
            <h3 className="text-sm font-semibold text-foreground">
              Contact details
            </h3>
            <p className="text-xs text-muted-foreground">
              Feel free to reach out through email or connect with me on
              GitHub/LinkedIn.
            </p>
            <div className="mt-2 space-y-1 text-xs text-muted-foreground">
              <p>
                <span className="font-semibold">Email:</span>{" "}
                your.email@example.com
              </p>
              <p>
                <span className="font-semibold">Location:</span> Your City,
                Country
              </p>
            </div>
          </div>
          <div className="card space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              Social links
            </h3>
            <div className="flex flex-wrap gap-3 text-xs">
              <a
                href="https://github.com/your-username"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-foreground transition hover:border-sky-500 hover:text-sky-500"
              >
                <FiGithub className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/your-username"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-foreground transition hover:border-sky-500 hover:text-sky-500"
              >
                <FiLinkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="mailto:your.email@example.com"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-foreground transition hover:border-sky-500 hover:text-sky-500"
              >
                <FiMail className="h-4 w-4" />
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}


