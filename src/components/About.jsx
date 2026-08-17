import aboutImg from "../assets/png-02.png";
import aboutBackground from "../assets/image01.jpg";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const ABOUT_PARAGRAPHS = [
  <>
    <span className="font-medium text-apple-text">UNIVERSALDOT</span> is a
    software agency that brings AI, custom software development, and web design
    together to create useful, memorable digital products.
  </>,
  "We partner with ambitious businesses to shape promising ideas into reliable, intuitive, and scalable solutions. Every engagement balances a clear product strategy and considered user experience with the robust engineering needed to perform in the real world.",
  "From AI-powered tools and custom platforms to responsive websites and applications, we support the complete journey—from discovery and design to development, launch, and refinement. Our process is collaborative, transparent, and focused on technology that solves meaningful problems and creates lasting value.",
];

const About = () => {
  return (
    <section className="section-padding relative isolate overflow-hidden border-t border-apple-border">
      <img
        src={aboutBackground}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 -z-10 bg-black/70" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-black" />

      <div className="section-container relative z-10">
        <SectionHeader
          eyebrow="About"
          title="Ideas, engineered with purpose."
          subtitle="Strategy, intelligent technology, and thoughtful design—working as one."
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
