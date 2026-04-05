"use client"
import { useState, useEffect, useRef } from "react";

const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  speed: Math.random() * 0.4 + 0.1,
  opacity: Math.random() * 0.6 + 0.2,
  drift: (Math.random() - 0.5) * 0.15,
}));

export default function PortfolioLanding() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState(PARTICLES);
  const [hoverBtn, setHoverBtn] = useState<null | "login" | "register">(null);
  const [loaded, setLoaded] = useState(false);
  const rafRef = useRef<number>(0);
  const tickRef = useRef(0);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      tickRef.current += 1;
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          y: p.y - p.speed * 0.05 < -2 ? 102 : p.y - p.speed * 0.05,
          x: p.x + p.drift < -2 ? 102 : p.x + p.drift > 102 ? -2 : p.x + p.drift,
        }))
      );
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const cx = typeof window !== "undefined" ? (mousePos.x / window.innerWidth - 0.5) * 22 : 0;
  const cy = typeof window !== "undefined" ? (mousePos.y / window.innerHeight - 0.5) * 22 : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#040712",
        fontFamily: "'Playfair Display', 'Georgia', serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Import Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Mono:wght@300;400&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(38px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 28px 4px rgba(120,200,255,0.13), 0 0 0 1px rgba(120,200,255,0.18); }
          50%       { box-shadow: 0 0 52px 12px rgba(120,200,255,0.28), 0 0 0 1px rgba(180,230,255,0.28); }
        }
        @keyframes orb1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(40px,-30px) scale(1.1); }
        }
        @keyframes orb2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-30px,40px) scale(1.08); }
        }
        @keyframes orb3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(20px,20px) scale(1.05); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes borderSpin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .fadeUp-1 { animation: fadeUp 0.9s cubic-bezier(.22,1,.36,1) 0.1s both; }
        .fadeUp-2 { animation: fadeUp 0.9s cubic-bezier(.22,1,.36,1) 0.3s both; }
        .fadeUp-3 { animation: fadeUp 0.9s cubic-bezier(.22,1,.36,1) 0.5s both; }
        .fadeUp-4 { animation: fadeUp 0.9s cubic-bezier(.22,1,.36,1) 0.7s both; }
        .fadeUp-5 { animation: fadeUp 0.9s cubic-bezier(.22,1,.36,1) 0.9s both; }
        .glow-card { animation: glowPulse 3.5s ease-in-out infinite; }
      `}</style>

      {/* Deep space background orbs */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
      }}>
        <div style={{
          position: "absolute", width: 700, height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(30,80,180,0.22) 0%, transparent 70%)",
          top: "-18%", left: "-12%",
          animation: "orb1 11s ease-in-out infinite",
          filter: "blur(2px)",
        }} />
        <div style={{
          position: "absolute", width: 600, height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(80,20,160,0.18) 0%, transparent 70%)",
          bottom: "-10%", right: "-8%",
          animation: "orb2 14s ease-in-out infinite",
          filter: "blur(2px)",
        }} />
        <div style={{
          position: "absolute", width: 400, height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(10,160,200,0.13) 0%, transparent 70%)",
          top: "40%", left: "55%",
          animation: "orb3 9s ease-in-out infinite",
          filter: "blur(1px)",
        }} />
      </div>

      {/* Floating particles */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: `rgba(${p.id % 3 === 0 ? "120,200,255" : p.id % 3 === 1 ? "180,140,255" : "80,220,200"},${p.opacity})`,
              boxShadow: `0 0 ${p.size * 3}px rgba(120,200,255,0.4)`,
              transition: "left 0.1s linear, top 0.1s linear",
            }}
          />
        ))}
      </div>

      {/* Mouse-tracking glow cursor */}
      <div
        style={{
          position: "fixed",
          left: mousePos.x - 160,
          top: mousePos.y - 160,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(80,160,255,0.09) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 2,
          transition: "left 0.06s linear, top 0.06s linear",
        }}
      />

      {/* Grid lines subtle */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(80,140,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(80,140,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />

      {/* Main card */}
      <div
        className="glow-card"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 680,
          width: "90%",
          padding: "62px 56px 58px",
          background: "rgba(8,15,35,0.82)",
          borderRadius: 28,
          border: "1px solid rgba(100,170,255,0.13)",
          backdropFilter: "blur(28px)",
          transform: loaded ? `perspective(900px) rotateX(${-cy * 0.018}deg) rotateY(${cx * 0.018}deg)` : "none",
          transition: "transform 0.12s ease-out",
          overflow: "hidden",
        }}
      >
        {/* Card inner glow top */}
        <div style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(160,210,255,0.35), transparent)",
        }} />

        {/* Decorative corner accent */}
        <div style={{
          position: "absolute", top: 24, right: 28,
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          color: "rgba(100,170,255,0.35)",
          letterSpacing: 2,
        }}>FOLIO.SYS</div>

        {/* Badge */}
        <div
          className="fadeUp-1"
          style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "rgba(60,120,255,0.1)",
            border: "1px solid rgba(80,150,255,0.2)",
            borderRadius: 40,
            padding: "5px 16px",
            marginBottom: 32,
          }}
        >
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#4fc3f7",
            boxShadow: "0 0 8px 2px rgba(79,195,247,0.7)",
            animation: "glowPulse 2s ease-in-out infinite",
          }} />
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: "rgba(160,210,255,0.75)",
            letterSpacing: 2,
          }}>PORTFOLIO BUILDER</span>
        </div>

        {/* Headline */}
        <h1
          className="fadeUp-2"
          style={{
            margin: "0 0 22px",
            fontSize: "clamp(2rem, 5vw, 3.1rem)",
            lineHeight: 1.12,
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "-0.5px",
          }}
        >
          You can build your{" "}
          <span style={{
            background: "linear-gradient(90deg, #7eb8ff 0%, #b48fff 50%, #7eb8ff 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 3.5s linear infinite",
            fontStyle: "italic",
          }}>
            portfolio
          </span>{" "}
          website here.
        </h1>

        {/* Subtitle */}
        <p
          className="fadeUp-3"
          style={{
            margin: "0 0 44px",
            fontSize: "1.08rem",
            lineHeight: 1.7,
            color: "rgba(180,210,240,0.62)",
            fontFamily: "'DM Mono', monospace",
            fontWeight: 300,
            letterSpacing: 0.2,
          }}
        >
          Craft a stunning, professional showcase of your work — no code required.
          Stand out, get hired, and own your story.
        </p>

        {/* Buttons */}
        <div
          className="fadeUp-4"
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          {/* Login */}
          <button
            onMouseEnter={() => setHoverBtn("login")}
            onMouseLeave={() => setHoverBtn(null)}
            style={{
              flex: 1,
              minWidth: 130,
              padding: "15px 32px",
              borderRadius: 12,
              border: "1px solid rgba(120,180,255,0.35)",
              background: hoverBtn === "login"
                ? "rgba(60,120,255,0.22)"
                : "rgba(30,60,130,0.18)",
              color: hoverBtn === "login" ? "#a8d4ff" : "rgba(160,210,255,0.8)",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.93rem",
              letterSpacing: 2,
              cursor: "pointer",
              transition: "all 0.22s cubic-bezier(.22,1,.36,1)",
              boxShadow: hoverBtn === "login"
                ? "0 0 24px 4px rgba(80,150,255,0.18), inset 0 1px 0 rgba(180,220,255,0.08)"
                : "inset 0 1px 0 rgba(180,220,255,0.05)",
              transform: hoverBtn === "login" ? "translateY(-2px)" : "none",
            }}
          >
            LOG IN
          </button>

          {/* Register */}
          <button
            onMouseEnter={() => setHoverBtn("register")}
            onMouseLeave={() => setHoverBtn(null)}
            style={{
              flex: 1,
              minWidth: 130,
              padding: "15px 32px",
              borderRadius: 12,
              border: "none",
              background: hoverBtn === "register"
                ? "linear-gradient(135deg, #5b9fff 0%, #9b6fff 100%)"
                : "linear-gradient(135deg, #3a7bd5 0%, #7b4fff 100%)",
              color: "#fff",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.93rem",
              letterSpacing: 2,
              cursor: "pointer",
              transition: "all 0.22s cubic-bezier(.22,1,.36,1)",
              boxShadow: hoverBtn === "register"
                ? "0 0 36px 8px rgba(100,140,255,0.35), 0 4px 24px rgba(100,60,255,0.3)"
                : "0 0 18px 2px rgba(80,120,255,0.2)",
              transform: hoverBtn === "register" ? "translateY(-2px) scale(1.03)" : "none",
            }}
          >
            GET STARTED
          </button>
        </div>

        {/* Divider */}
        <div
          className="fadeUp-5"
          style={{
            marginTop: 44,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div style={{ flex: 1, height: 1, background: "rgba(100,150,255,0.1)" }} />
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: "rgba(120,160,220,0.35)",
            letterSpacing: 3,
          }}>FEATURES</span>
          <div style={{ flex: 1, height: 1, background: "rgba(100,150,255,0.1)" }} />
        </div>

        {/* Feature pills */}
        <div
          className="fadeUp-5"
          style={{
            marginTop: 24,
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          {["✦ Custom Domain", "✦ Live Preview", "✦ Dark & Light", "✦ Analytics", "✦ SEO Ready"].map((f) => (
            <span
              key={f}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10.5,
                color: "rgba(140,190,255,0.55)",
                letterSpacing: 1.2,
                padding: "5px 13px",
                border: "1px solid rgba(100,160,255,0.1)",
                borderRadius: 40,
                background: "rgba(40,70,140,0.08)",
              }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* Card inner glow bottom */}
        <div style={{
          position: "absolute", bottom: 0, left: "10%", right: "10%", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(120,100,255,0.2), transparent)",
        }} />
      </div>

      {/* Bottom watermark */}
      <div style={{
        position: "fixed",
        bottom: 22,
        left: 0, right: 0,
        textAlign: "center",
        fontFamily: "'DM Mono', monospace",
        fontSize: 10,
        color: "rgba(80,120,200,0.28)",
        letterSpacing: 3,
        zIndex: 10,
      }}>
        PORTFOLIO · BUILDER · STUDIO
      </div>
    </div>
  );
}