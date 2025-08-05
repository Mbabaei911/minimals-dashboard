

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type LayoutType = 'default' | 'wide' | 'narrow';

interface UIState {
  // Theme
  darkMode: boolean;
  toggleDarkMode: () => void;
  
  // Contrast
  highContrast: boolean;
  toggleHighContrast: () => void;
  
  // Direction
  rtl: boolean;
  toggleRTL: () => void;
  
  // Density
  compactMode: boolean;
  toggleCompactMode: () => void;
  
  // Font
  fontFamily: string;
  setFontFamily: (family: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  
  // Layout
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
  
  // Color Scheme
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  
  // Presentation Mode
  presentationMode: boolean;
  togglePresentationMode: () => void;
  
  // Size Scaling
  sizeMultiplier: number;
  increaseSize: () => void;
  decreaseSize: () => void;
  resetSize: () => void;
  
  // Reset all settings
  resetSettings: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // Initial state
      darkMode: false,
      highContrast: false,
      rtl: false,
      compactMode: false,
      fontFamily: 'system-ui',
      fontSize: 16,
      layout: 'default',
      primaryColor: '#3b82f6',
      presentationMode: false,
      sizeMultiplier: 1,

      // Actions
      toggleDarkMode: () => {
        const newDarkMode = !get().darkMode;
        set({ darkMode: newDarkMode });
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', newDarkMode);
        }
      },

      toggleHighContrast: () => {
        const newHighContrast = !get().highContrast;
        set({ highContrast: newHighContrast });
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('high-contrast', newHighContrast);
        }
      },

      toggleRTL: () => {
        const newRtl = !get().rtl;
        set({ rtl: newRtl });
        if (typeof document !== 'undefined') {
          document.documentElement.dir = newRtl ? 'rtl' : 'ltr';
        }
      },

      toggleCompactMode: () => {
        const newCompactMode = !get().compactMode;
        set({ compactMode: newCompactMode });
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('compact', newCompactMode);
        }
      },
      setFontFamily: (family) => {
        set({ fontFamily: family });
        if (typeof document !== 'undefined') {
          // Update both CSS variable and direct style
          document.documentElement.style.setProperty('--font-family', family);
          document.documentElement.style.fontFamily = `${family}, sans-serif`;
        }
      },
      setFontSize: (size) => {
        const clampedSize = Math.max(12, Math.min(24, size));
        set({ fontSize: clampedSize });
        if (typeof document !== 'undefined') {
          document.documentElement.style.fontSize = `${clampedSize}px`;
        }
      },

      setLayout: (layout) => {
        set({ layout });
        if (typeof document !== 'undefined') {
          document.documentElement.classList.remove('layout-default', 'layout-wide', 'layout-narrow');
          document.documentElement.classList.add(`layout-${layout}`);
        }
      },

      setPrimaryColor: (color) => {
        set({ primaryColor: color });
        if (typeof document !== 'undefined') {
          document.documentElement.style.setProperty('--primary-color', color);
        }
      },

      togglePresentationMode: () => {
        const newPresentationMode = !get().presentationMode;
        set({ presentationMode: newPresentationMode });
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('presentation-mode', newPresentationMode);
        }
      },

      increaseSize: () => {
        const newMultiplier = Math.min(1.5, get().sizeMultiplier + 0.1);
        set({ sizeMultiplier: newMultiplier });
        if (typeof document !== 'undefined') {
          document.documentElement.style.setProperty('--size-multiplier', String(newMultiplier));
        }
      },

      decreaseSize: () => {
        const newMultiplier = Math.max(0.8, get().sizeMultiplier - 0.1);
        set({ sizeMultiplier: newMultiplier });
        if (typeof document !== 'undefined') {
          document.documentElement.style.setProperty('--size-multiplier', String(newMultiplier));
        }
      },

      resetSize: () => {
        set({ sizeMultiplier: 1 });
        if (typeof document !== 'undefined') {
          document.documentElement.style.setProperty('--size-multiplier', '1');
        }
      },

      resetSettings: () => {
        set({
          darkMode: false,
          highContrast: false,
          rtl: false,
          compactMode: false,
          fontFamily: 'system-ui',
          fontSize: 16,
          layout: 'default',
          primaryColor: '#3b82f6',
          presentationMode: false,
          sizeMultiplier: 1,
        });

        if (typeof document !== 'undefined') {
          document.documentElement.classList.remove(
            'dark',
            'high-contrast',
            'compact',
            'presentation-mode'
          );
          document.documentElement.dir = 'ltr';
          document.documentElement.style.fontSize = '16px';
          document.documentElement.style.setProperty('--font-family', 'system-ui');
          document.documentElement.style.setProperty('--primary-color', '#3b82f6');
          document.documentElement.style.setProperty('--size-multiplier', '1');
          document.documentElement.classList.remove('layout-default', 'layout-wide', 'layout-narrow');
          document.documentElement.classList.add('layout-default');
        }
      },
    }),
    {
      name: 'ui-preferences',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        darkMode: state.darkMode,
        highContrast: state.highContrast,
        rtl: state.rtl,
        compactMode: state.compactMode,
        fontFamily: state.fontFamily,
        fontSize: state.fontSize,
        layout: state.layout,
        primaryColor: state.primaryColor,
        sizeMultiplier: state.sizeMultiplier,
      }),
    }
  )
);