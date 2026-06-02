import { useEffect } from 'react';
import { initSmoothScroll, destroySmoothScroll } from './lib/smoothScroll.js';
import Cursor from './components/ui/Cursor.jsx';
import GrainOverlay from './components/ui/GrainOverlay.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import WhySubtle from './components/WhySubtle.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Workflow from './components/Workflow.jsx';
import Engage from './components/Engage.jsx';
import SocialProof from './components/SocialProof.jsx';
import FinalCTA from './components/FinalCTA.jsx';
import FAQ from './components/FAQ.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  useEffect(() => {
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);

  return (
    <div className="relative">
      <Cursor />
      <GrainOverlay />
      <Navbar />
      <main>
        <Hero />
        <WhySubtle />
        <About />
        <Services />
        <Workflow />
        <Engage />
        <SocialProof />
        <FinalCTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
