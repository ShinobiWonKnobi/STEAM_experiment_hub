import { useEffect } from 'react';
import { useAccessibilityStore } from '../stores/accessibilityStore';

export const useAccessibility = () => {
  const { 
    highContrast, 
    largeText, 
    reducedMotion,
    colorBlindMode 
  } = useAccessibilityStore();
  
  useEffect(() => {
    // Apply high contrast mode
    document.documentElement.style.setProperty(
      '--high-contrast',
      highContrast ? '1' : '0'
    );
    
    // Apply large text mode
    document.documentElement.style.setProperty(
      '--large-text',
      largeText ? '1' : '0'
    );
    
    // Apply reduced motion mode
    document.documentElement.style.setProperty(
      '--reduced-motion',
      reducedMotion ? '1' : '0'
    );
    
    // Apply color blind mode
    document.documentElement.style.setProperty(
      '--color-blind',
      colorBlindMode ? '1' : '0'
    );
  }, [highContrast, largeText, reducedMotion, colorBlindMode]);
  
  return useAccessibilityStore();
}; 