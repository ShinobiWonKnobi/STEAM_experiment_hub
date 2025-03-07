import React, { useEffect } from 'react';
import { useAccessibilityStore } from '../stores/accessibilityStore';

/**
 * A component that loads dyslexia-friendly fonts when the dyslexiaFriendlyFont setting is enabled
 * 
 * @returns A component that loads dyslexia-friendly fonts
 */
const DyslexiaFontLoader: React.FC = () => {
  const { dyslexiaFriendlyFont } = useAccessibilityStore();
  
  useEffect(() => {
    if (!dyslexiaFriendlyFont) return;
    
    // Create a link element for the OpenDyslexic font
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/open-dyslexic-regular.css';
    linkElement.id = 'dyslexia-font-stylesheet';
    
    // Check if the stylesheet is already loaded
    if (!document.getElementById('dyslexia-font-stylesheet')) {
      document.head.appendChild(linkElement);
    }
    
    // Add a class to the body for additional styling if needed
    document.body.classList.add('dyslexia-friendly');
    
    // Cleanup function to remove the stylesheet when the setting is disabled
    return () => {
      const existingLink = document.getElementById('dyslexia-font-stylesheet');
      if (existingLink) {
        document.head.removeChild(existingLink);
      }
      document.body.classList.remove('dyslexia-friendly');
    };
  }, [dyslexiaFriendlyFont]);
  
  // This component doesn't render anything
  return null;
};

export default DyslexiaFontLoader; 