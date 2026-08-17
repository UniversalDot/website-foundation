import { motion } from "framer-motion";
import analytictail from "../assets/Ananlyticstail.png";
import greatapps from "../assets/GreatApps.png";
import tripmaven from "../assets/TripMaven.png";
import dealsonsoftware from "../assets/DealsonSoftware.png";
import universalbitwallet from "../assets/universalbitwallet.png";
import instantmemoir from "../assets/InstantMemoir.png";
import itlinksme from "../assets/ItLinksme.png";
import SectionHeader from "./SectionHeader";
import projectsBackground from "../assets/image03.jpg";

const PROJECTS = [
  {
  title: "GreatApps.net",

  description:

    "A software discovery platform focused on helping users find useful applications and digital tools across a variety of categories.",

  image: greatapps,

  url: "https://greatapps.net",
},

{
  title: "DealsOnSoftware.com",

  description:

    "A software deals directory for discovering and submitting offers across AI, marketing, productivity, finance, and development tools, featuring category filtering, search, deal submissions, and newsletter subscriptions.",

  image: dealsonsoftware,

  url: "https://dealsonsoftware.com",
},

{
  title: "ItLinks.me",

  description:

    "A digital platform designed to make sharing and organizing important links simple, accessible, and easy to manage from one central location.",

  image: itlinksme,

  url: "https://itlinks.me",
},

{
  title: "TripMaven.org",

  description:

    "An AI-powered travel planning platform that generates personalized itineraries, recommends destinations and experiences, integrates interactive maps, and allows users to create and manage trips.",

  image: tripmaven,

  url: "https://tripmaven.org",
},

{
  title: "UniversalBitWallet.com",

  description:

    "A self-custodial multicurrency cryptocurrency wallet designed for managing digital assets across multiple blockchain networks and platforms including web, mobile, and desktop.",

  image: universalbitwallet,

  url: "https://universalbitwallet.com",
},

{
  title: "AnalyticsTail.org",

  description:

    "A lightweight embeddable website analytics widget providing persistent visitor statistics and real-time updates, with a Node.js backend and Server-Sent Events for live analytics.",

  image: analytictail,

  url: "https://analyticstail.org",
},

{
  title: "InstantMemoir.com",

  description:

    "A modern web platform for creating personalized memoir albums, featuring an interactive album creation flow, user authentication, payments, and a responsive React-based experience.",

  image: instantmemoir,

  url: "https://instantmemoir.com",
},
];

const Pro = () => {
  return (
    <section className="section-padding relative isolate overflow-hidden border-t border-apple-border">
      <img
        src={projectsBackground}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-20"
      />
      <div className="absolute inset-0 -z-10 bg-black/80" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-b from-transparent to-black" />

      <div className="section-container relative z-10">
        <SectionHeader
          eyebrow="Projects"
          title="Work built to make an impact."
          subtitle="Explore selected digital products that pair purposeful design with capable, dependable technology."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              onClick={() => window.open(project.url, "_blank")}
              className="apple-card group cursor-pointer overflow-hidden relative"
            >
              {/* Subtle glow behind the card */}
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-white/20 blur-3xl pointer-events-none" />

              <div className="overflow-hidden relative z-10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 relative z-10">
                <h3 className="text-lg font-semibold text-apple-text">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-apple-muted line-clamp-3">
                  {project.description}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-apple-secondary opacity-0 transition-opacity group-hover:opacity-100">
                  Visit project →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <button
            onClick={() => window.open("https://github.com/UniversalDot", "_blank")}
            className="rounded-full border border-apple-border px-8 py-3 text-sm font-medium text-apple-text transition-all hover:border-white/20 hover:bg-apple-surface active:scale-[0.98]"
          >
            Explore more on GitHub
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Pro;
