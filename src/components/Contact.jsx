import { useState } from "react";
import { CONTACT } from "../constants";
import {
  FaDocker,
  FaGithub,
  FaLinkedin,
  FaMedium,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import contactBackground from "../assets/image05.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _subject: "New submission from your Portfolio!",
          _template: "table",
          _captcha: "false"
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section className="section-padding relative isolate overflow-hidden border-t border-apple-border">
      <img
        src={contactBackground}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-bottom opacity-30"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/90 via-black/65 to-black/80" />

      <div className="section-container relative z-10">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something valuable."
          subtitle="Tell us what you are creating, where you are stuck, or what you want to improve. We would love to explore what is possible together."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-lg flex-col items-center mt-12 w-full"
        >
          <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            {/* Subtle glow behind the form */}
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-white/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-white/20 blur-3xl pointer-events-none" />
            
            <form 
              onSubmit={handleSubmit}
              className="relative z-10 w-full space-y-5"
            >
              <div className="flex flex-col gap-5 sm:flex-row">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-apple-text outline-none transition-all placeholder:text-apple-muted focus:border-white/30 focus:bg-white/10 focus:ring-4 focus:ring-white/5"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-apple-text outline-none transition-all placeholder:text-apple-muted focus:border-white/30 focus:bg-white/10 focus:ring-4 focus:ring-white/5"
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us about your project"
                required
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-apple-text outline-none transition-all placeholder:text-apple-muted focus:border-white/30 focus:bg-white/10 focus:ring-4 focus:ring-white/5"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-glass w-full py-4 text-base tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : 'Start a conversation'}
              </button>

              {status === 'success' && (
                <p className="text-white text-sm text-center mt-2">
                  Message sent successfully!
                </p>
              )}
              {status === 'error' && (
                <p className="text-white text-sm text-center mt-2">
                  Oops! Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
          
          <p className="mt-8 text-base text-apple-muted font-medium">{CONTACT.phoneNo}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a
              href="https://www.linkedin.com/company/universaldot/"
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-apple-border text-xl text-apple-muted transition-all hover:border-white/20 hover:text-apple-text"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/UniversalDot"
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-apple-border text-xl text-apple-muted transition-all hover:border-white/20 hover:text-apple-text"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.youtube.com/@universaldotfoundation"
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-apple-border text-xl text-apple-muted transition-all hover:border-white/20 hover:text-apple-text"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="https://medium.com/@universaldot"
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-apple-border text-xl text-apple-muted transition-all hover:border-white/20 hover:text-apple-text"
              aria-label="Medium"
            >
              <FaMedium />
            </a>
            <a
              href="https://twitter.com/Universaldot_"
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-apple-border text-xl text-apple-muted transition-all hover:border-white/20 hover:text-apple-text"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://hub.docker.com/u/universaldot"
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-apple-border text-xl text-apple-muted transition-all hover:border-white/20 hover:text-apple-text"
              aria-label="Docker Hub"
            >
              <FaDocker />
            </a>
          </div>
        </motion.div>

        <footer className="mt-24 border-t border-apple-border pt-8 text-center">
          <p className="text-xs text-apple-muted">
            © {new Date().getFullYear()} UNIVERSALDOT. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
