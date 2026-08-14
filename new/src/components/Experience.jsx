import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const EXPERIENCES = [
  {
    title: "Ashtayah Labs",
    role: "AI Engineering Intern",
    period: "May 2026 – July 2026",
    summary: "Worked as an AI Engineer Intern on intelligent invoice processing, GST reconciliation, and document automation using AI and cloud technologies.",
    bullets: [
      "Built an intelligent invoice processing and GST reconciliation platform using Node.js, React, Firebase, Gmail OAuth, and Google Gemini AI for automated invoice extraction and ITC validation.",
      "Developed a GST reconciliation engine with exact, fuzzy, and historical matching algorithms, along with a real-time dashboard for reconciliation insights and vendor communication."
    ],
  },
  {
    title: "GOAT Robotics",
    role: "R&D Intern",
    period: "May 2025 – December 2025",
    summary:
      "Worked as a R&D intern on multi-agent path finding (MAPF), robotics toolchains, and navigation for coordinated robot fleets.",
    bullets: [
      "Built the GT‑Studio robotics toolchain (PGM map editor, 3D polygon editor, and Grafana dashboard) to support fleet‑level mapping and analytics.",
      "Implemented a LaCAM2‑based MAPF engine in C++ and contributed to navigation and localization experiments using the Stanley Controller and Cartographer.",
    ],
  },
];

const ExperienceCard = ({ title, role, period, summary, bullets }) => {
  const hasDescription = summary || bullets.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="apple-card group p-8 md:p-10 cursor-default relative overflow-hidden"
    >
      {/* Subtle glow behind the card */}
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-apple-text md:text-2xl transition-colors group-hover:text-apple-blue">
            {title}
          </h3>
          {role && (
            <p className="mt-1 text-base text-apple-muted">{role}</p>
          )}
        </div>
        <p className="text-sm font-medium text-apple-muted sm:text-right">
          {period}
        </p>
      </div>

      {hasDescription && (
        <div className="relative z-10 grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-in-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-6 group-hover:pt-6 border-t border-transparent group-hover:border-apple-border">
          <div className="overflow-hidden">
            {summary && (
              <p className="text-base leading-relaxed text-apple-muted mb-4">
                {summary}
              </p>
            )}
            {bullets.length > 0 && (
              <ul className="space-y-3">
                {bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 text-base leading-relaxed text-apple-muted"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-apple-blue" />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section className="section-padding border-t border-apple-border">
      <div className="section-container">
        <SectionHeader
          eyebrow="Experience"
          title="Where I've worked."
          subtitle="Hands-on experience in robotics, algorithms, and building tools that scale."
        />

        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          {EXPERIENCES.map((exp) => (
            <ExperienceCard key={exp.title} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
