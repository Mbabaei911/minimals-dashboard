// src/pages/_app.js
import * as React from 'react';
import type { AppProps } from 'next/app';
import { Public_Sans } from 'next/font/google';
import { useUIStore } from '../store/UiStore';
import { useEffect } from 'react';
import "../styles/globals.css";

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-public-sans',
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const {
    darkMode,
    rtl,
    compactMode,
    fontFamily,
    fontSize,
    primaryColor,
    sizeMultiplier
  } = useUIStore();
  
  // Apply the preferences to the document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    
    // You can add more style manipulations here
  }, [darkMode, rtl, primaryColor, sizeMultiplier]);

  return (
    <>
      <style jsx global>{`
        :root {
          --font-public-sans: ${publicSans.style.fontFamily};
        }
        body {
          font-family: ${fontFamily}, ${publicSans.style.fontFamily}, sans-serif;
        }
      `}</style>
      <div className={`${compactMode ? 'compact' : ''} ${fontSize}`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}