"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { SmoothScrollContext } from "@/components/ui/parallax-scrolling";

export type GalleryProject = {
  number: string;
  title: string;
  subtitle?: string;
  type: string;
  description: string[];
  technologies: string[];
  image: string;
  imageAlt: string;
  github: string;
  accent: string;
};

type ExpandableGalleryProps = {
  projects: GalleryProject[];
  className?: string;
};

export function ExpandableGallery({ projects, className = "" }: ExpandableGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const smoothScroll = useContext(SmoothScrollContext);
  const isOpen = selectedIndex !== null;

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
  }, [selectedIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const lenis = smoothScroll?.current;
    const wasStopped = lenis?.isStopped;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.documentElement.style.overflow = previousOverflow;
      if (!wasStopped) lenis?.start();
      trigger?.focus({ preventScroll: true });
    };
  }, [isOpen, smoothScroll]);

  return (
    <div className={`expandable-gallery ${className}`}>
      <div className="expandable-gallery-track">
        {projects.map((project, index) => (
          <motion.button
            type="button"
            key={project.title}
            className={`project-gallery-panel panel-${project.accent}`}
            animate={reducedMotion ? { flex: 1 } : { flex: hoveredIndex === null ? 1 : hoveredIndex === index ? 2 : 0.62 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.5, ease: "easeInOut" }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => setHoveredIndex(index)}
            onBlur={() => setHoveredIndex(null)}
            onClick={() => setSelectedIndex(index)}
            aria-label={`Open ${project.title} project details`}
          >
            <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 800px) 88vw, 25vw" className="project-gallery-image" />
            <motion.span className="project-gallery-shade" animate={{ opacity: hoveredIndex === index ? 0.08 : 0.58 }} transition={{ duration: 0.3 }} />
            <span className="project-gallery-number">{project.number}</span>
            <span className="project-gallery-label"><strong>{project.title}</strong><small>{project.type}</small></span>
            <span className="project-gallery-open">Open dossier ↗</span>
          </motion.button>
        ))}
      </div>

        {selectedIndex !== null && (
          <dialog ref={dialogRef} className="project-dossier" aria-label={`${projects[selectedIndex].title} project details`} data-lenis-prevent onCancel={(event) => { event.preventDefault(); setSelectedIndex(null); }} onKeyDown={(event) => {
            if (event.key === "Tab") {
              const controls = event.currentTarget.querySelectorAll<HTMLElement>('button, a[href]');
              const first = controls[0];
              const last = controls[controls.length - 1];
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last?.focus();
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first?.focus();
              }
            }
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              setSelectedIndex((selectedIndex + (event.key === "ArrowLeft" ? -1 : 1) + projects.length) % projects.length);
            }
          }} onClick={(event) => { if (event.target === event.currentTarget) setSelectedIndex(null); }}>
            <button type="button" className="dossier-close" onClick={() => setSelectedIndex(null)} aria-label="Close project details">Close <span>×</span></button>
            <button type="button" className="dossier-previous" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex - 1 + projects.length) % projects.length); }} aria-label="Previous project">←</button>
            <motion.div ref={contentRef} className="dossier-content" onClick={(event) => event.stopPropagation()} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
              <div className="dossier-image"><Image src={projects[selectedIndex].image} alt={projects[selectedIndex].imageAlt} fill sizes="(max-width: 800px) 92vw, 52vw" className="project-gallery-image" /></div>
              <div className="dossier-copy">
                <div className="dossier-meta">
                  <span>{projects[selectedIndex].number} / {projects.length}</span>
                  <span>{projects[selectedIndex].type}</span>
                </div>
                <h3>{projects[selectedIndex].title}</h3>
                {projects[selectedIndex].subtitle && <p className="dossier-subtitle">{projects[selectedIndex].subtitle}</p>}
                <div className="dossier-tools">
                  <span className="dossier-tools-label">Tools</span>
                  <div className="dossier-tech">
                    {projects[selectedIndex].technologies.map((technology) => <span key={technology}>{technology}</span>)}
                  </div>
                </div>
                <ul className="dossier-highlights">
                  {projects[selectedIndex].description.map((point) => <li key={point}>{point}</li>)}
                </ul>
                <a className="dossier-source" href={projects[selectedIndex].github} target="_blank" rel="noopener noreferrer">View source on GitHub ↗</a>
              </div>
            </motion.div>
            <button type="button" className="dossier-next" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex + 1) % projects.length); }} aria-label="Next project">→</button>
            <span className="dossier-counter">{selectedIndex + 1} / {projects.length}</span>
          </dialog>
        )}
    </div>
  );
}
