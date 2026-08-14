import { Routes, Route } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Pro from './components/pro';
import Parl from './components/parl';
import Blog from './components/Blog';
import BlogArticlePage from './pages/BlogArticlePage';

const PortfolioHome = () => {
  return (
    <>
      <Navbar />
      <Parl />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        {/* <section id="experience">
          <Experience />
        </section>
        <section id="blog">
          <Blog />
        </section> */}
        <section id="projects">
          <Pro />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
    </>
  );
};

const App = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black antialiased">
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/blog/:slug" element={<BlogArticlePage />} />
      </Routes>
    </div>
  );
};

export default App;
