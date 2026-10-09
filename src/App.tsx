import About from './components/About';
import Approach from './components/Approach';
import ContactFooter from './components/ContactFooter';
import FAQ from './components/FAQ';
import FocusBelief from './components/FocusBelief';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Navbar from './components/Navbar';
import Problems from './components/Problems';
import Projects from './components/Projects';
import Solutions from './components/Solutions';
import SystemLog from './components/SystemLog';

export default function App() {
  return (
    <div id="top" className="surface min-h-screen transition-colors duration-500 ease-editorial">
      <Navbar />
      <main>
        <Hero />
        <About />
        <FocusBelief />
        <Problems />
        <Approach />
        {/* `[ 03 // CODE_MANIFESTO ]` — the engineering thesis, placed right
            before the architecture and case-study sections it governs. */}
        <Manifesto />
        <Solutions />
        <Projects />
        {/* `[ A4 // ENGAGEMENT_FAQ ]` — cost, lock-in, timeline and support are
            the four things that decide whether the form below gets filled in,
            so they get answered before it, not after. */}
        <FAQ />
        <ContactFooter />
      </main>
      <SystemLog />
    </div>
  );
}