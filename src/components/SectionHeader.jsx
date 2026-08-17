import { motion } from "framer-motion";

const SectionHeader = ({ eyebrow, title, subtitle, align = "center" }) => {
  const alignClass =
    align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className={`mb-16 flex flex-col ${alignClass}`}
    >
      {eyebrow && <p className="section-eyebrow mb-4">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className={`section-subtitle ${align === "center" ? "mx-auto" : ""}`}>{subtitle}</p>}
    </motion.div>
  );
};

export default SectionHeader;
