"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X, ChevronDown, Download } from "lucide-react";

// Inline Button component
export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// BlurText animation component
export interface BlurTextProps {
  text: string;
  delay?: number;
  duration?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
  onAnimationComplete?: () => void;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  duration = 1.0,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
  onAnimationComplete,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  useEffect(() => {
    if (inView && onAnimationComplete && segments.length > 0) {
      const totalTime = (segments.length - 1) * delay + duration * 1000;
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, totalTime);
      return () => clearTimeout(timer);
    }
  }, [inView, onAnimationComplete, segments.length, delay, duration]);

  return (
    <p ref={ref} className={`inline-flex ${animateBy === "letters" ? "flex-nowrap" : "flex-wrap"} ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all ${duration}s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

export interface PortfolioHeroProps {
  id?: string;
  firstName?: string;
  lastName?: string;
  tagline?: string;
  profileImage?: string;
  resumeUrl?: string;
  signature?: string;
  accentColor?: string;
  menuItems?: Array<{ label: string; href: string; highlight?: boolean }>;
  showNav?: boolean;
}

export default function Component({
  id = "top",
  firstName = "ALEX",
  lastName = "KANE",
  tagline = "Designing human experiences in code.",
  resumeUrl,
  profileImage = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=800&q=80",
  signature = "A",
  accentColor = "#C3E41D",
  menuItems = [
    { label: "HOME", href: "#", highlight: true },
    { label: "ABOUT", href: "#" },
    { label: "PROJECTS", href: "#" },
    { label: "EXPERIENCE", href: "#" },
    { label: "EDUCATION", href: "#" },
    { label: "WRITING", href: "#" },
    { label: "CONTACT", href: "#" },
  ],
  showNav = true,
}: PortfolioHeroProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageTimerDone, setImageTimerDone] = useState(false);
  const [firstNameDone, setFirstNameDone] = useState(false);
  const [lastNameDone, setLastNameDone] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isImageVisible = imageTimerDone || (firstNameDone && lastNameDone);

  // Fallback timer based on name character length and duration
  useEffect(() => {
    const maxLetters = Math.max(firstName.length, lastName.length);
    const calculatedDuration = Math.max(0, (maxLetters - 1) * 100) + 1050;
    const timer = setTimeout(() => {
      setImageTimerDone(true);
    }, calculatedDuration);
    return () => clearTimeout(timer);
  }, [firstName, lastName]);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div
      id={id}
      className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden text-foreground"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Seamless ambient background layers matching the architectural site */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          backgroundImage: "linear-gradient(rgba(111, 145, 125, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(111, 145, 125, 0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 48%, rgba(214, 168, 79, 0.06), transparent 75%)",
        }}
      />
      {/* Smooth gradient blend into following sections */}
      <div
        className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--background))",
        }}
      />

      {/* Header */}
      {showNav && (
        <header
          className="portfolio-masthead fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{
            backgroundColor: "rgba(7, 9, 12, 0.85)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <nav className="relative flex min-h-11 flex-wrap items-center justify-between max-w-screen-2xl mx-auto" aria-label="Main navigation">
            {/* Menu Button */}
            <div className="relative lg:hidden">
              <button
                ref={buttonRef}
                type="button"
                className="p-2 transition-colors duration-300 z-50 text-neutral-400 hover:text-white"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-7 h-7 md:w-8 md:h-8 transition-colors duration-300" strokeWidth={2} />
                ) : (
                  <Menu className="w-7 h-7 md:w-8 md:h-8 transition-colors duration-300" strokeWidth={2} />
                )}
              </button>

              {isMenuOpen && (
                <div
                  ref={menuRef}
                  className="absolute top-full left-0 w-[220px] md:w-[250px] shadow-2xl mt-2 ml-2 md:ml-4 p-4 rounded-lg z-[100] border"
                  style={{
                    backgroundColor: "rgba(12, 16, 21, 0.98)",
                    borderColor: "var(--line)",
                  }}
                >
                  {menuItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block text-base md:text-lg font-bold tracking-tight py-2 px-3 cursor-pointer rounded transition-colors duration-200"
                      style={{
                        color: item.highlight ? accentColor : "var(--foreground)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = accentColor;
                        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = item.highlight ? accentColor : "var(--foreground)";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Signature */}
            <a
              href="#top"
              className="masthead-wordmark absolute left-1/2 top-[22px] -translate-x-1/2 -translate-y-1/2 select-none hover:opacity-85 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6a84f]"
              style={{
                color: "var(--foreground)",
                fontFamily: "var(--font-geist-sans), sans-serif",
              }}
              aria-label="Back to top"
            >
              {signature}
              <span style={{ color: accentColor }} aria-hidden="true">.</span>
            </a>

            {/* Contact */}
            <div className="ml-auto flex min-h-11 items-center gap-3">
              <a
                href="#contact"
                className="font-mono text-[11px] tracking-widest text-[#d6a84f] hover:text-[#f2f0e8] transition-colors uppercase pl-1"
              >
                LET&apos;S TALK ↗
              </a>
            </div>

            <div className="masthead-links hidden w-full items-center justify-center lg:flex">
              {menuItems.filter((item) => ["#about", "#experience", "#work", "#toolbox"].includes(item.href)).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="desktop-nav-link inline-flex min-h-11 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6a84f]"
                >
                  {item.href === "#toolbox" ? "Skills" : item.label.charAt(0).toUpperCase() + item.label.slice(1).toLowerCase()}
                </a>
              ))}
            </div>
          </nav>
        </header>
      )}

      {/* Hero Section */}
      <main className="relative min-h-screen flex flex-col">
        {/* Centered Main Name - Always Perfectly Centered */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
          <div className="relative text-center">
            <div>
              <BlurText
                text={firstName}
                delay={100}
                duration={1.0}
                animateBy="letters"
                direction="top"
                className="font-bold text-[clamp(3rem,20vw,210px)] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: accentColor, fontFamily: "'Fira Code', monospace" }}
                onAnimationComplete={() => setFirstNameDone(true)}
              />
            </div>
            <div>
              <BlurText
                text={lastName}
                delay={100}
                duration={1.0}
                animateBy="letters"
                direction="top"
                className="font-bold text-[clamp(3rem,20vw,210px)] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: accentColor, fontFamily: "'Fira Code', monospace" }}
                onAnimationComplete={() => setLastNameDone(true)}
              />
            </div>

            {/* Profile Picture - Enters smoothly after text animation finishes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <div
                style={{
                  opacity: isImageVisible ? 1 : 0,
                  transform: isImageVisible ? "scale(1)" : "scale(0.7)",
                  filter: isImageVisible ? "blur(0px)" : "blur(10px)",
                  pointerEvents: isImageVisible ? "auto" : "none",
                  transition: "opacity 0.75s ease-out, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), filter 0.75s ease-out",
                }}
              >
                <div className="w-[65px] h-[110px] sm:w-[90px] sm:h-[152px] md:w-[110px] md:h-[185px] lg:w-[129px] lg:h-[218px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer pointer-events-auto">
                  <img
                    src={
                      profileImage.startsWith("http://") ||
                        profileImage.startsWith("https://") ||
                        profileImage.startsWith("/") ||
                        profileImage.startsWith("data:")
                        ? profileImage
                        : `/${profileImage}`
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tagline - Proper Distance Below Hero */}
        <div className="absolute z-20 bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-32 xl:bottom-36 left-1/2 -translate-x-1/2 w-full px-6">
          <div className="flex justify-center">
            <BlurText
              text={tagline}
              delay={150}
              duration={1.0}
              animateBy="words"
              direction="top"
              className="text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center transition-colors duration-300 text-neutral-500 hover:text-black dark:hover:text-white"
              style={{ fontFamily: "'Antic', sans-serif" }}
            />
          </div>
          {resumeUrl && (
            <div className="mt-5 flex justify-center">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-download inline-flex min-h-11 items-center justify-center gap-2.5 rounded-sm px-4 py-2.5 font-mono text-[10px] font-medium uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6a84f]"
              >
                Download résumé
                <Download className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          )}
          <div className="mt-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 font-mono text-[10.5px] tracking-wider text-neutral-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              AVAILABLE FOR WORK
            </span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#focus"
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 transition-colors duration-300 text-neutral-500 hover:text-white"
          aria-label="Scroll down to focus"
        >
          <ChevronDown className="w-5 h-5 md:w-8 md:h-8 transition-colors duration-300 animate-bounce" />
        </a>
      </main>
    </div>
  );
}
