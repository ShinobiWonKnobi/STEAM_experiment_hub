import { useState, useEffect, useCallback, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useGamificationStore } from '../stores/gamificationStore';
import type { VoiceCommand } from '../types';

export interface VoiceCommandsState {
  transcript: string;
  listening: boolean;
  browserSupportsSpeechRecognition: boolean;
  microphonePermission: 'granted' | 'denied' | 'prompt';
  commands: VoiceCommand[];
  toggleListening: () => Promise<void>;
  resetTranscript: () => void;
  uniqueCommandsUsed: Set<string>;
  error: string | null;
  lastRecognizedCommand: string | null;
  commandRecognizedAt: number | null;
  confidenceLevel: number;
}

export const useVoiceCommands = (): VoiceCommandsState => {
  const [isListening, setIsListening] = useState(false);
  const [uniqueCommandsUsed, setUniqueCommandsUsed] = useState<Set<string>>(new Set());
  const [microphonePermission, setMicrophonePermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [error, setError] = useState<string | null>(null);
  const [lastRecognizedCommand, setLastRecognizedCommand] = useState<string | null>(null);
  const [commandRecognizedAt, setCommandRecognizedAt] = useState<number | null>(null);
  const [confidenceLevel, setConfidenceLevel] = useState<number>(0);
  
  const earnBadge = useGamificationStore((state) => state.earnBadge);
  
  // Store commands in a ref to avoid recreating them on each render
  const commandsRef = useRef<VoiceCommand[]>([
    {
      command: 'add base',
      description: 'Add 1 mL of base solution',
    },
    {
      command: 'add five milliliters',
      description: 'Add 5 mL of base solution',
    },
    {
      command: 'reset experiment',
      description: 'Reset the experiment',
    },
    {
      command: 'show results',
      description: 'Show the results',
    },
    {
      command: 'go to dashboard',
      description: 'Return to the dashboard',
    },
    {
      command: 'start auto titration',
      description: 'Start automatic titration',
    },
    {
      command: 'stop auto titration',
      description: 'Stop automatic titration',
    },
    {
      command: 'start pendulum',
      description: 'Start the pendulum motion',
    },
    {
      command: 'stop pendulum',
      description: 'Stop the pendulum motion',
    },
    {
      command: 'show trace',
      description: 'Show pendulum trace',
    },
    {
      command: 'hide trace',
      description: 'Hide pendulum trace',
    },
  ]);

  const handleCommand = useCallback((command: string, { matchInterim = false } = {}) => {
    // Update the set of unique commands used
    setUniqueCommandsUsed(prev => {
      const newSet = new Set(prev);
      newSet.add(command);
      
      // Check if user has earned the Voice Commander badge
      if (newSet.size >= 5) {
        earnBadge('voice-master');
      }
      
      return newSet;
    });
    
    // Update the last recognized command and timestamp
    setLastRecognizedCommand(command);
    setCommandRecognizedAt(Date.now());
    
    // Set a random confidence level between 0.7 and 1.0 for visual feedback
    setConfidenceLevel(0.7 + Math.random() * 0.3);
    
    // Clear the last recognized command after 3 seconds
    setTimeout(() => {
      setLastRecognizedCommand(null);
      setCommandRecognizedAt(null);
      setConfidenceLevel(0);
    }, 3000);
  }, [earnBadge]);
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ 
    commands: commandsRef.current.map(c => ({ 
      command: c.command, 
      callback: () => handleCommand(c.command)
    })) 
  });

  // Check microphone permission
  useEffect(() => {
    const checkMicrophonePermission = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasMicrophone = devices.some(device => device.kind === 'audioinput');
        
        if (!hasMicrophone) {
          setError('No microphone detected');
          return;
        }

        const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        setMicrophonePermission(permission.state);
        
        permission.addEventListener('change', () => {
          setMicrophonePermission(permission.state);
        });
      } catch (err) {
        console.error('Error checking microphone permission:', err);
        setError('Unable to access microphone permissions');
      }
    };

    checkMicrophonePermission();
  }, []);
  
  // Manual transcript processing for better command detection
  useEffect(() => {
    if (!transcript || !listening) return;
    
    const lowerTranscript = transcript.toLowerCase();
    
    // Check if any command is in the transcript
    for (const cmd of commandsRef.current) {
      if (lowerTranscript.includes(cmd.command.toLowerCase())) {
        // Only process if this is a new command or if 3 seconds have passed since the last one
        if (
          lastRecognizedCommand !== cmd.command || 
          (commandRecognizedAt && Date.now() - commandRecognizedAt > 3000)
        ) {
          handleCommand(cmd.command);
          break;
        }
      }
    }
  }, [transcript, listening, lastRecognizedCommand, commandRecognizedAt, handleCommand]);
  
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setError('Browser does not support speech recognition');
      return;
    }
    
    if (microphonePermission === 'denied') {
      setError('Microphone access denied');
      return;
    }
    
    if (isListening && !listening) {
      SpeechRecognition.startListening({ continuous: true }).catch(err => {
        console.error('Error starting speech recognition:', err);
        setError('Failed to start speech recognition');
        setIsListening(false);
      });
    } else if (!isListening && listening) {
      SpeechRecognition.stopListening().catch(err => {
        console.error('Error stopping speech recognition:', err);
      });
    }
  }, [isListening, listening, browserSupportsSpeechRecognition, microphonePermission]);
  
  const toggleListening = async () => {
    if (microphonePermission === 'prompt') {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicrophonePermission('granted');
      } catch (err) {
        console.error('Error requesting microphone permission:', err);
        setMicrophonePermission('denied');
        setError('Microphone access denied');
        return;
      }
    }
    
    setIsListening(!isListening);
    setError(null);
    
    // Reset transcript when toggling
    if (!isListening) {
      resetTranscript();
    }
  };
  
  // Start listening by default if permissions are granted
  useEffect(() => {
    if (microphonePermission === 'granted' && !error) {
      setIsListening(true);
    }
    
    return () => {
      SpeechRecognition.stopListening().catch(err => {
        console.error('Error stopping speech recognition:', err);
      });
    };
  }, [microphonePermission, error]);
  
  return {
    transcript,
    listening,
    toggleListening,
    resetTranscript,
    commands: commandsRef.current,
    browserSupportsSpeechRecognition,
    microphonePermission,
    uniqueCommandsUsed,
    error,
    lastRecognizedCommand,
    commandRecognizedAt,
    confidenceLevel
  };
}; 