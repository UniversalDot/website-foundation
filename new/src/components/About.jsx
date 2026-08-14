import aboutImg from "../assets/png-02.png";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const ABOUT_PARAGRAPHS = [
  <>
    We are <span className="font-medium text-apple-text">UNIVERSALDOT</span>, a software agency focused on AI, Software Development, and Web Design.
  </>,
  "UniversalDot is a software agency focused on turning ideas into reliable, intuitive, and scalable digital products. We work with businesses to design and develop modern software solutions that combine thoughtful user experiences with strong technical foundations.",
  <>
  From web and mobile applications to custom platforms and digital tools, UniversalDot supports clients throughout the entire development journey. Our approach is collaborative, practical, and driven by one goal: building technology that solves real problems and creates lasting value.
  </>,
  // "Beyond engineering, I enjoy visual design creating logos and branding. Off-screen, I spend my downtime drawing and singing.",
];

const About = () => {
  return (
    <section className="section-padding border-t border-apple-border">
      <div className="section-container">
        <SectionHeader
          eyebrow="About"
          title="Introducing..."
          subtitle="UNIVERSALDOT, Software development, and thoughtful design."
          align="left"
        />

        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="order-2 flex justify-center lg:order-1"
          >
            <div className="about-blob-wrap">
              <div className="about-blob-glow" />
              <img
                src={aboutImg}
                alt="UNIVERSALDOT Logo"
                className="about-blob-photo"
              />
            </div>
          </motion.div>

          <div className="order-1 space-y-6 lg:order-2">
            {ABOUT_PARAGRAPHS.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-base leading-relaxed text-apple-muted md:text-lg"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
