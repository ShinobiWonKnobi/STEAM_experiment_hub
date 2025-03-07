import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AccessibilityState {
  // Visual accessibility
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  colorBlindMode: boolean;
  dyslexiaFriendlyFont: boolean;
  
  // Audio and interaction
  screenReaderOptimized: boolean;
  keyboardNavigationEnhanced: boolean;
  autoplayVideos: boolean;
  
  // Content preferences
  simplifiedLanguage: boolean;
  contentWarnings: boolean;
  
  // Methods
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleReducedMotion: () => void;
  toggleColorBlindMode: () => void;
  toggleDyslexiaFriendlyFont: () => void;
  toggleScreenReaderOptimized: () => void;
  toggleKeyboardNavigationEnhanced: () => void;
  toggleAutoplayVideos: () => void;
  toggleSimplifiedLanguage: () => void;
  toggleContentWarnings: () => void;
  resetToDefaults: () => void;
}

export const useAccessibilityStore = create<AccessibilityState>()(
  persist(
    (set) => ({
      // Default values
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      colorBlindMode: false,
      dyslexiaFriendlyFont: false,
      screenReaderOptimized: false,
      keyboardNavigationEnhanced: false,
      autoplayVideos: true,
      simplifiedLanguage: false,
      contentWarnings: true,
      
      // Toggle methods
      toggleHighContrast: () => set((state) => ({ highContrast: !state.highContrast })),
      toggleLargeText: () => set((state) => ({ largeText: !state.largeText })),
      toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
      toggleColorBlindMode: () => set((state) => ({ colorBlindMode: !state.colorBlindMode })),
      toggleDyslexiaFriendlyFont: () => set((state) => ({ dyslexiaFriendlyFont: !state.dyslexiaFriendlyFont })),
      toggleScreenReaderOptimized: () => set((state) => ({ screenReaderOptimized: !state.screenReaderOptimized })),
      toggleKeyboardNavigationEnhanced: () => set((state) => ({ keyboardNavigationEnhanced: !state.keyboardNavigationEnhanced })),
      toggleAutoplayVideos: () => set((state) => ({ autoplayVideos: !state.autoplayVideos })),
      toggleSimplifiedLanguage: () => set((state) => ({ simplifiedLanguage: !state.simplifiedLanguage })),
      toggleContentWarnings: () => set((state) => ({ contentWarnings: !state.contentWarnings })),
      
      // Reset all settings to defaults
      resetToDefaults: () => set({
        highContrast: false,
        largeText: false,
        reducedMotion: false,
        colorBlindMode: false,
        dyslexiaFriendlyFont: false,
        screenReaderOptimized: false,
        keyboardNavigationEnhanced: false,
        autoplayVideos: true,
        simplifiedLanguage: false,
        contentWarnings: true,
      }),
    }),
    {
      name: 'accessibility-settings',
    }
  )
); 