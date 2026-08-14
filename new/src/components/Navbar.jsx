import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const NAV_LINKS = [
  { id: "about", label: "About" },
  // { id: "experience", label: "Experience" },
  // { id: "blog", label: "Blog" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/70 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-12">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm font-semibold tracking-tight text-apple-text transition-opacity hover:opacity-70"
        >
          UNIVERSALDOT
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleScroll(id)}
              className="text-xs font-medium text-apple-muted transition-colors hover:text-apple-text"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-5 text-base text-apple-muted">
          <a
            href="https://www.linkedin.com/company/universaldot/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-apple-text"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/UniversalDot"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-apple-text"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
