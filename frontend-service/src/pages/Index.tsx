import { useEffect } from "react";
import api from "../api/axiosInstance";
import Navbar from "../components/public/Navbar";
import Hero from "../components/public/Hero";
import Projects from "../components/public/Projects";
import Skills from "../components/public/Skills";
import Experience from "../components/public/Experience";
import Contact from "../components/public/Contact";

const Index = () => {
  // Fire page view analytics event on load
  useEffect(() => {
    const trackPageView = async () => {
      try {
        await api.get('/content/projects'); // the controller tracks PAGE_VIEWED internally
      } catch (e) {
        // silently fail tracking
      }
    };
    trackPageView();
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-indigo-500/30 font-sans">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      
      <footer className="py-8 text-center text-gray-500 border-t border-white/10 text-sm">
        <p>&copy; {new Date().getFullYear()} Microservices Portfolio. Built with Spring Boot & React.</p>
      </footer>
    </div>
  );
};

export default Index;
