import { HERO_CONTENT } from "../constants";
import { motion } from "framer-motion";
import heroDog from "../assets/image03.jpg";

const Hero = () => {
  const handleScroll = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 md:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center justify-between gap-12 lg:flex-row">
        {/* Left Side: Text */}
        <div className="flex flex-col items-start text-left lg:w-3/5 lg:pl-16 xl:pl-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="max-w-4xl text-5xl font-thin tracking-tight font-apple text-apple-text md:text-7xl lg:text-8xl"
          >
            UNIVERSALDOT
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-4xl text-lg font-medium leading-relaxed text-apple-muted md:text-xl lg:text-2xl"
          >
            Software Agency focused on AI, Software Development, and Web Design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-12 flex flex-wrap items-center gap-6"
          >
            <button
              onClick={() => handleScroll("projects")}
              className="btn-glass"
            >
              View Projects
            </button>
            <button
              onClick={() => handleScroll("about")}
              className="text-sm font-medium text-apple-blue transition-opacity hover:opacity-70"
            >
              Learn more →
            </button>
          </motion.div>
        </div>

        {/* Right Side: Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="flex w-full justify-end lg:w-2/5"
        >
          <img
            src={heroDog}
            alt="Hero Dog"
            className="w-full max-w-[450px] object-contain drop-shadow-2xl lg:mr-[-50px]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
