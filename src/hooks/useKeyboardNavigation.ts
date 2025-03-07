import { useEffect, useRef } from 'react';
import { useAccessibilityStore } from '../stores/accessibilityStore';

interface KeyboardNavigationOptions {
  selector?: string;
  enabled?: boolean;
  onEscape?: () => void;
  onEnter?: () => void;
  focusFirstOnMount?: boolean;
}

/**
 * A hook that enhances keyboard navigation for a container element
 * 
 * @param options Configuration options for keyboard navigation
 * @returns A ref to attach to the container element
 */
export const useKeyboardNavigation = <T extends HTMLElement>({
  selector = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
  enabled,
  onEscape,
  onEnter,
  focusFirstOnMount = false,
}: KeyboardNavigationOptions = {}) => {
  const containerRef = useRef<T>(null);
  const { keyboardNavigationEnhanced } = useAccessibilityStore();
  
  // Use the enabled prop if provided, otherwise use the accessibility store setting
  const isEnabled = enabled !== undefined ? enabled : keyboardNavigationEnhanced;
  
  useEffect(() => {
    if (!isEnabled || !containerRef.current) return;
    
    const container = containerRef.current;
    
    // Focus the first focusable element when the component mounts
    if (focusFirstOnMount) {
      const focusableElements = container.querySelectorAll<HTMLElement>(selector);
      if (focusableElements.length > 0) {
        setTimeout(() => {
          focusableElements[0].focus();
        }, 100);
      }
    }
    
    const handleKeyDown = (event: KeyboardEvent) => {
      const focusableElements = Array.from(
        container.querySelectorAll<HTMLElement>(selector)
      ).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
      
      if (!focusableElements.length) return;
      
      const currentIndex = focusableElements.findIndex(
        el => el === document.activeElement
      );
      
      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault();
          if (currentIndex < focusableElements.length - 1) {
            focusableElements[currentIndex + 1].focus();
          } else {
            // Wrap around to the first element
            focusableElements[0].focus();
          }
          break;
          
        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault();
          if (currentIndex > 0) {
            focusableElements[currentIndex - 1].focus();
          } else {
            // Wrap around to the last element
            focusableElements[focusableElements.length - 1].focus();
          }
          break;
          
        case 'Home':
          event.preventDefault();
          focusableElements[0].focus();
          break;
          
        case 'End':
          event.preventDefault();
          focusableElements[focusableElements.length - 1].focus();
          break;
          
        case 'Escape':
          if (onEscape) {
            event.preventDefault();
            onEscape();
          }
          break;
          
        case 'Enter':
          if (onEnter && document.activeElement === event.target) {
            event.preventDefault();
            onEnter();
          }
          break;
      }
    };
    
    container.addEventListener('keydown', handleKeyDown);
    
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEnabled, selector, onEscape, onEnter, focusFirstOnMount]);
  
  return containerRef;
};

export default useKeyboardNavigation; 