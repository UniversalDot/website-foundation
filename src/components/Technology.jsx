import { RiReactjsLine } from "react-icons/ri";
import { FaHtml5, FaPython, FaNodeJs, FaFigma, FaDatabase, FaCss3Alt, FaRProject, FaJsSquare, FaJava } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { motion } from "framer-motion";
import Cpro from "../assets/c-removebg-preview.png";
import Cpropl from "../assets/c++-removebg-preview.png";
import Ai from "../assets/Ai-removebg-preview.png";
import Ps from "../assets/ps-removebg-preview.png";

// Animation variants for icons
const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

const Technology = () => {
  const commonColor = "bg-neutral-800"; // Unified background color for all items

  const icons = [
    { Component: RiReactjsLine, duration: 2.5, type: "icon" },
    { Component: FaHtml5, duration: 3, type: "icon" },
    { Component: FaCss3Alt, duration: 5, type: "icon" },
    { Component: FaFigma, duration: 2, type: "icon" },
    { Component: FaPython, duration: 4, type: "icon" },
    { Component: SiMongodb, duration: 3, type: "icon" },
    { Component: FaDatabase, duration: 4, type: "icon" },
    { Component: FaJava, duration: 5, type: "icon" },
    { Component: FaJsSquare, duration: 3, type: "icon" },
    { Component: FaNodeJs, duration: 2, type: "icon" },
    { Component: FaRProject, duration: 3, type: "icon" },
    { Component: Cpro, duration: 5, type: "image", alt: "C Programming" },
    { Component: Cpropl, duration: 4, type: "image", alt: "C++ Programming" },
    { Component: Ai, duration: 2, type: "image", alt: "Adobe Illustrator" },
    { Component: Ps, duration: 2.5, type: "image", alt: "Adobe Photoshop" },
  ];

  return (
    <div className="border-b border-neutral-800 pb-24">
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        className="my-20 text-center text-4xl text-white"
      >
        Technologies
      </motion.h1>

      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 1.5 }}
        className="flex flex-wrap items-center justify-center gap-6"
      >
        {icons.map(({ Component, duration, type, alt }, index) => (
          <motion.div
            key={index}
            variants={iconVariants(duration)}
            initial="initial"
            animate="animate"
            className={`flex items-center justify-center w-24 h-24 rounded-full ${commonColor}`}
          >
            {type === "icon" ? (
              <Component className="text-4xl text-white" />
            ) : (
              <img src={Component} alt={alt} className="h-12 w-12" />
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Technology;
