import { ThemeProvider } from './context/ThemeContext';
import About from './components/About';
import Approach from './components/Approach';
import ContactFooter from './components/ContactFooter';
import FocusBelief from './components/FocusBelief';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Problems from './components/Problems';
import Projects from './components/Projects';
import Solutions from './components/Solutions';

export default function App() {
  return (
    <ThemeProvider>
      <div
        id="top"
        className="surface min-h-screen transition-colors duration-500 ease-editorial"
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <FocusBelief />
          <Problems />
          <Approach />
          <Solutions />
          <Projects />
          <ContactFooter />
        </main>
      </div>
    </ThemeProvider>
  );
}
