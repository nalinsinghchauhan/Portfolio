"use client";

import { ExpandableGallery, type GalleryProject } from "@/components/ui/gallery-animation";

const projects: GalleryProject[] = [
  {
    number: "01",
    title: "AWS Infrastructure Monitor",
    type: "APRIL 2026 / INFRASTRUCTURE",
    description: [
      "Provisioned complete AWS infrastructure (VPC, EC2, RDS, ALB, Security Groups, IAM, CloudWatch) using Terraform. The entire environment is reproducible from code in under 5 minutes with zero manual console interaction.",
      "Built a Jenkins CI/CD pipeline running in Docker, triggered by GitHub webhooks. Code changes are automatically tested, infrastructure updated via Terraform, and deployed via Ansible to live AWS in under 6 minutes with no manual steps.",
      "Automated zero-touch server configuration using Ansible. A blank EC2 instance goes from raw Linux to a production-ready Flask application with Nginx, bcrypt authentication, and encrypted secrets (Ansible Vault) in under 3 minutes.",
    ],
    technologies: ["Python", "Flask", "Terraform", "Ansible", "Jenkins", "Docker", "AWS"],
    image: "/projects/aws-infrastructure-monitor.png",
    imageAlt: "AWS Infrastructure Monitor dashboard showing EC2 instance counts, states, regions, and instance details",
    github: "https://github.com/nalinsinghchauhan/aws-infrastructure-monitor",
    accent: "saffron",
  },
  {
    number: "02",
    title: "RAG-Chat",
    type: "AUGUST 2026 / APPLIED AI",
    description: [
      "Built a full-stack RAG application that lets users upload PDF study material and chat with it, using FastAPI, React, and a local LLM via Ollama, fully offline with no external API.",
      "Implemented the document pipeline: PDF text extraction, chunking, and vector embeddings stored in ChromaDB for semantic search.",
      "Added source citations (document name and page number) alongside every answer so responses stay grounded in the uploaded material.",
    ],
    technologies: ["FastAPI", "React", "ChromaDB", "Ollama / Llama 3.1", "sentence-transformers", "PyMuPDF"],
    image: "/projects/rag-chat.png",
    imageAlt: "RagChat interface showing document questions, AI answers, and source references",
    github: "https://github.com/nalinsinghchauhan/RagChat",
    accent: "blue",
  },
  {
    number: "03",
    title: "ElectraVote",
    subtitle: "Full Stack Voting Platform",
    type: "MAY 2025 / FULL-STACK PLATFORM",
    description: [
      "Developed a full-stack election management platform with Admin and Member dashboards, secure voting, and election lifecycle management.",
      "Designed RESTful APIs and a PostgreSQL database using Express.js and Drizzle ORM with session-based authentication.",
      "Implemented frontend data fetching using React Query with automatic caching and synchronization.",
    ],
    technologies: ["React", "TypeScript", "Express.js", "Node.js", "Drizzle ORM", "PostgreSQL"],
    image: "/projects/electravote.png",
    imageAlt: "ElectraVote administrator dashboard showing ongoing and upcoming elections",
    github: "https://github.com/nalinsinghchauhan/ElectraVote",
    accent: "rose",
  },
  {
    number: "04",
    title: "CHATRooms",
    type: "JULY 2026 / FULL-STACK REALTIME",
    description: [
      "Built a full-stack real-time chat application using Socket.IO WebSockets with JWT authentication, room-based messaging, and live typing and presence indicators.",
      "Developed RESTful APIs with Node.js, Express.js, and MongoDB, integrating persistent message storage with real-time event-driven communication.",
      "Containerized the application using Docker to streamline environment setup, dependency management, and consistent execution across development workflows.",
    ],
    technologies: ["React.js", "Node.js", "Express.js", "WebSockets (Socket.IO)", "MongoDB Atlas", "JWT", "Docker"],
    image: "/projects/chatrooms.png",
    imageAlt: "ChatRooms interface showing a group conversation, available rooms, and online members",
    github: "https://github.com/nalinsinghchauhan/CHATRooms-WebSocket",
    accent: "green",
  },
];

export function ProjectsSection() {
  return (
    <section id="work" className="projects-archive shell">
      <div className="section-index">05 <i>/</i> selected work</div>
      <div className="projects-archive-heading">
        <h2>My Projects.</h2>
        <p>Project archive / 04<br />Hover to expand. Select to inspect.</p>
      </div>
      <ExpandableGallery projects={projects} />
      <div className="projects-archive-footer">
        <span>systems built / 2025 — 2026</span>
        <span>four project dossiers</span>
      </div>
    </section>
  );
}
