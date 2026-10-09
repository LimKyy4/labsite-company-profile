import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        {/*
         * `reducedMotion="user"` is the one place the OS preference reaches
         * Framer Motion. The global CSS override in index.css only collapses
         * CSS animations/transitions; Framer drives its springs and layout
         * animations on rAF via inline styles, so without this every reveal,
         * layout pill and drawer would still animate for a visitor who asked
         * for no motion.
         */}
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
);
