import { useRef, useEffect, useState, useCallback } from 'react';
import { useVoiceCommands } from './useVoiceCommands';
import { useGamificationStore } from '../stores/gamificationStore';
import type { VoiceCommand } from '../types';

interface UsePhetVoiceCommandsProps {
  iframeRef: React.RefObject<HTMLIFrameElement>;
  commandActions: Record<string, () => void>;
}

interface UsePhetVoiceCommandsResult {
  listening: boolean;
  toggleListening: () => Promise<void>;
  lastCommand: string | null;
  sendCommand: (action: string, params?: Record<string, any>) => boolean;
  error: string | null;
}

export const usePhetVoiceCommands = ({
  iframeRef,
  commandActions
}: UsePhetVoiceCommandsProps): UsePhetVoiceCommandsResult => {
  const [lastCommand, setLastCommand] = useState<string | null>(null);
  const isConnected = useRef(false);
  const earnBadge = useGamificationStore((state) => state.earnBadge);
  const [audioContextResumed, setAudioContextResumed] = useState(false);
  
  // Get the voice commands hook
  const {
    listening,
    toggleListening,
    lastRecognizedCommand,
    error
  } = useVoiceCommands();
  
  // Handle communication with the PhET iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Verify the message is from PhET
      if (event.data && event.data.type === 'phet-simulation-loaded') {
        isConnected.current = true;
        console.log('PhET simulation connected and ready for commands');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);
  
  // Function to send commands to the PhET simulation
  const sendCommand = useCallback((action: string, params: Record<string, any> = {}): boolean => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      // First, try to resume AudioContext if not already done
      if (!audioContextResumed) {
        iframeRef.current.contentWindow.postMessage({
          messageType: 'user-interaction',
          action: 'resume-audio'
        }, '*');
        setAudioContextResumed(true);
      }
      
      // Then send the actual command
      const message = {
        messageType: 'user-interaction',
        action,
        ...params
      };
      
      iframeRef.current.contentWindow.postMessage(message, '*');
      console.log(`Sent command to PhET: ${action}`, params);
      return true;
    }
    
    console.warn('Failed to send command: iframe not available');
    return false;
  }, [iframeRef, audioContextResumed]);
  
  // React to recognized voice commands
  useEffect(() => {
    if (lastRecognizedCommand && commandActions[lastRecognizedCommand]) {
      setLastCommand(lastRecognizedCommand);
      commandActions[lastRecognizedCommand]();
      
      // Check if we've used 5 voice commands to earn the badge
      const uniqueCommands = new Set<string>();
      uniqueCommands.add(lastRecognizedCommand);
      if (uniqueCommands.size >= 5) {
        earnBadge('voice-commander');
      }
    }
  }, [lastRecognizedCommand, commandActions, earnBadge]);

  // Ensure we can resume AudioContext when toggling listening
  const wrappedToggleListening = useCallback(async () => {
    // Try to resume AudioContext when enabling voice commands
    if (!listening && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        messageType: 'user-interaction',
        action: 'resume-audio'
      }, '*');
      setAudioContextResumed(true);
    }
    
    await toggleListening();
  }, [toggleListening, listening, iframeRef]);

  return {
    listening,
    toggleListening: wrappedToggleListening,
    lastCommand,
    sendCommand,
    error
  };
};

export default usePhetVoiceCommands; 