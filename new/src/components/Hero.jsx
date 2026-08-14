import { motion } from "framer-motion";
import heroBackground from "../assets/image02.jpg";

const Hero = () => {
  const handleScroll = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden px-6 pt-24 md:px-12">
      <img
        src={heroBackground}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/80 to-black/25" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-transparent to-black/40" />

      <div className="mx-auto flex w-full max-w-7xl items-center">
        <div className="flex max-w-4xl flex-col items-start text-left lg:pl-16 xl:pl-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="max-w-4xl font-apple text-5xl font-extrabold uppercase leading-none tracking-[0.025rem] text-apple-text md:text-7xl lg:text-8xl"
          >
            UNIVERSALDOT
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-4xl text-lg font-extralight leading-relaxed tracking-wider text-apple-muted md:text-xl lg:text-2xl"
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
              className="text-sm font-medium text-apple-secondary transition-opacity hover:opacity-70"
            >
              Learn more →
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
