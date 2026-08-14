import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BLOG_POSTS } from "../constants/blogs";
import SectionHeader from "./SectionHeader";

const Blog = () => {
  return (
    <section className="section-padding border-t border-apple-border">
      <div className="section-container">
        <SectionHeader
          eyebrow="Blog"
          title="Thoughts & research."
          subtitle="Writing on algorithms, robotics, and the ideas behind the work."
        />

        <div className="mx-auto flex max-w-3xl flex-col gap-5">
          {BLOG_POSTS.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className={`apple-card group flex flex-col gap-6 p-6 sm:items-center md:p-8 relative overflow-hidden ${i % 2 !== 0 ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}
              >
                {/* Subtle glow behind the card */}
                <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="relative z-10 h-48 w-full shrink-0 rounded-2xl object-cover sm:h-40 sm:w-64"
                  />
                ) : (
                  <div className="relative z-10 flex h-48 w-full shrink-0 items-center justify-center rounded-2xl bg-apple-surface2 sm:h-40 sm:w-64">
                    <span className="text-xs font-semibold uppercase tracking-widest text-apple-muted">
                      Research
                    </span>
                  </div>
                )}
                <div className="relative z-10 flex-1">
                  <p className="text-xs font-medium uppercase tracking-widest text-apple-muted">
                    {post.tags || "Article"}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-apple-text transition-colors group-hover:text-apple-blue md:text-xl">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-apple-muted">
                      {post.excerpt}
                    </p>
                  )}
                  <span className="mt-4 inline-block text-sm font-medium text-apple-blue">
                    Read article →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
