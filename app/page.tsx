import Image from "next/image";
import PortfolioHero from "@/components/ui/portfolio-hero";
import { ParallaxScroll } from "@/components/ui/parallax-scrolling";
import { FocusSection } from "@/components/sections/focus-section";
import { ProjectsSection } from "@/components/sections/projects-section";

const toolbox = [
  ["Languages", "Python, C++, C"],
  ["Web", "HTML, CSS, JavaScript, TypeScript, React, Node.js, WebSockets (Socket.IO)"],
  ["AI / ML", "RAG (Retrieval-Augmented Generation), LLMs, ChromaDB, sentence-transformers, Ollama"],
  ["APIs", "FastAPI, REST API"],
  ["Databases", "MySQL, PostgreSQL"],
  ["Version Control", "Git, GitHub"],
  ["Cloud and DevOps", "AWS (EC2, RDS, VPC, IAM, CloudWatch), Docker, Terraform, Ansible, Jenkins"],
];

const certifications = [
  ["SAP Certified: Generative AI Developer", "March 2026", "https://www.credly.com/badges/a3b691ee-59a8-4338-86e8-af1624324a17/public_url"],
  ["AWS Certified: Cloud Practitioner", "April 2026", "https://www.credly.com/badges/db6d928b-a6cf-42d3-8197-2439fd68a1e2/public_url"],
  ["AWS Certified: AI Practitioner", "April 2026", "https://www.credly.com/badges/b3e80568-320a-45a9-b321-487918053d04/public_url"],
  ["AWS Certified: Developer Associate", "April 2026", "https://www.credly.com/badges/51d53456-c441-4f14-a086-3c033a3e0104/public_url"],
];

export default function Home() {
  return (
    <ParallaxScroll>
      <main className="portfolio-page">
        {/* Redesigned Hero with Integrated Navigation */}
        <PortfolioHero
          id="top"
          firstName="NALIN"
          lastName="CHAUHAN"
          tagline="Building intelligent systems. Engineering softwares that scale."
          signature="NSC"
          accentColor="#d6a84f"
          profileImage="/NalinIMAGE.jpeg"
          resumeUrl="https://drive.google.com/uc?export=download&id=1nyo0OVCnPBA8Ca4Q-3mcKYNCCPAC5HuN"
          menuItems={[
            { label: "HOME", href: "#top", highlight: true },
            { label: "FOCUS", href: "#focus" },
            { label: "ABOUT", href: "#about" },
            { label: "EXPERIENCE", href: "#experience" },
            { label: "PROJECTS", href: "#work" },
            { label: "TOOLBOX", href: "#toolbox" },
            { label: "EDUCATION", href: "#education" },
            { label: "CONTACT", href: "#contact" },
          ]}
        />

        {/* 02 / Focus */}
        <FocusSection />

        {/* 03 / About */}
        <section id="about" className="depth-section about-section shell">
          <div className="section-index">03 <i>/</i> about</div>
          <div className="depth-grid">
            <div>
              <h2>
                Building scalable software at the intersection of<br />
                <em>AI and engineering.</em>
              </h2>
              <p className="large-copy">
                I&apos;m a Computer Science Engineering student at S.R.M. Institute of Science and Technology, interested in building practical software across full-stack development, cloud infrastructure, and AI. My experience spans AWS infrastructure automation, RAG applications, real-time systems, and NLP research.
              </p>
            </div>
            <div className="about-margin">
              <span className="annotation-mark">GPA: 9.81 / 10.00</span>
              <p>
                I&apos;m interested in building reliable software that connects strong engineering fundamentals with practical AI applications.
              </p>
              <span className="annotation-mark">CHENNAI, TAMIL NADU, INDIA</span>
            </div>
          </div>
          <div className="depth-image">
            <Image
              src="/himalayas-to-ganges.png"
              alt="My journey from Uttarakhand's Himalayan mountains on the left, to Chennai in the centre, and Varanasi's riverside ghats on the right"
              width={1926}
              height={816}
              sizes="(max-width: 1228px) calc(100vw - 48px), 1180px"
              className="about-journey-image"
              data-parallax-speed="0.12"
            />
          </div>
          <ol className="journey-caption" aria-label="My journey">
            <li><strong>Uttarakhand</strong><span>Where I&apos;m from</span></li>
            <li><strong>Chennai</strong><span>B.Tech at SRM</span></li>
            <li><strong>Varanasi</strong><span>Research internship at IIT (BHU)</span></li>
          </ol>
        </section>

        {/* 04 / Experience */}
        <section id="experience" className="research-depth section-dark-band">
          <div className="shell research-depth-inner">
            <div className="section-index">04 <i>/</i> experience</div>
            <div className="research-heading">
              <p className="micro-label">IIT (BHU), VARANASI / JUNE 2025 — JULY 2025</p>
              <h2>Standardizing linguistic data for Indian languages.</h2>
              <p>
                <strong>Research Intern</strong>, Department of Computer Science and Engineering. Mentor: Dr. Anil Kumar Singh.
              </p>
            </div>
            <div className="research-diagram" data-parallax-speed="-0.12">
              <div>Indian Languages</div>
              <span>↓</span>
              <div>SSF / Computational Paninian Grammar</div>
              <span>↓</span>
              <div>Conversion scripts</div>
              <span>↓</span>
              <div>CoNLL-U / Universal Dependencies</div>
            </div>
            <div className="research-footnotes">
              <span>STANDARDIZED LINGUISTIC DATASETS</span>
              <span>PSEUDO UNIVERSAL DEPENDENCY TREEBANK</span>
              <span>FORMAT FIDELITY</span>
            </div>
          </div>
        </section>

        {/* 05 / Selected Work */}
        <ProjectsSection />


        {/* 06 / Toolbox */}
        <section id="toolbox" className="toolbox-depth shell">
          <div className="section-index">06 <i>/</i> toolbox</div>
          <div className="toolbox-heading">
            <h2>Tools I work with.</h2>
            <p>
              A snapshot of the technologies I use across application development, AI, and infrastructure.
            </p>
          </div>
          <div className="toolbox-system">
            {toolbox.map(([label, items], index) => (
              <div className="toolbox-row" key={label} data-parallax-speed={index % 2 === 0 ? "0.05" : "-0.05"}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{label}</strong>
                <p>{items}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 07 / Education & 08 / Certifications */}
        <section className="credentials-depth section-dark-band">
          <div className="shell credentials-grid">
            <div id="education">
              <div className="section-index">07 <i>/</i> education</div>
              <h2>Education</h2>
              <div className="education-record">
                <strong>S.R.M. Institute of Science and Technology</strong>
                <p>
                  B.Tech in Computer Science Engineering<br />
                  Chennai, India<br />
                  Expected graduation: May 2027<br />
                  GPA: 9.81/10.00
                </p>
              </div>
            </div>
            <div id="certifications">
              <div className="section-index">08 <i>/</i> certifications</div>
              <h2>Credentials</h2>
              <div className="credential-list">
                {certifications.map(([name, date, url], index) => (
                  <div className="credential-line" key={name}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{name}</strong>
                      <p>{date}</p>
                      <a className="credential-link" href={url} target="_blank" rel="noopener noreferrer">
                        Verify Credential ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 09 / Contact */}
        <section id="contact" className="contact-frame">
          <div className="shell contact-inner">
            <div className="section-index">09 <i>/</i> final frame</div>
            <h2>
              Let&apos;s build what<br />
              <em>comes next.</em>
            </h2>
            <div className="contact-grid">
              <div className="contact-details">
                <a href="mailto:nc3162@srmist.edu.in">nc3162@srmist.edu.in</a>
                <a href="mailto:nalinsinghchauhan23@gmail.com">nalinsinghchauhan23@gmail.com</a>
                <a href="tel:+916395885707">+91 6395885707</a>
              </div>
              <div className="contact-details">
                <span>Chennai, Tamil Nadu, India</span>
                <a href="https://github.com/nalinsinghchauhan" target="_blank" rel="noopener noreferrer">
                  GitHub / nalinsinghchauhan
                </a>
                <a href="https://www.linkedin.com/in/nalinsinghchauhan/" target="_blank" rel="noopener noreferrer">
                  LinkedIn / nalinsinghchauhan
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="site-footer shell">
          <span>
            NSC<span className="accent-text">.</span> / layered engineering portfolio
          </span>
          <a href="#top">Back to top ^</a>
        </footer>
      </main>
    </ParallaxScroll>
  );
}
