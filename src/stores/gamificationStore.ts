import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useNotificationStore } from './notificationStore';
import { Badge, ExperimentProgress } from '../types';

export interface GamificationState {
  badges: Badge[];
  progress: ExperimentProgress[];
  earnBadge: (badgeId: string) => void;
  updateProgress: (experimentId: string, score: number) => void;
  getCompletedExperiments: () => number;
  resetProgress: () => void;
  getBadgeById: (badgeId: string) => Badge | undefined;
  getExperimentProgress: (experimentId: string) => { progress: number; completed: boolean };
  getEarnedBadges: () => Badge[];
}

// Default badges with proper descriptions and images
const defaultBadges: Badge[] = [
  {
    id: 'first-experiment',
    name: 'First Steps',
    description: 'Complete your first experiment with a score of 60% or higher',
    imageUrl: 'https://img.icons8.com/color/96/test-tube.png',
    earned: false,
  },
  {
    id: 'perfect-score',
    name: 'Perfect Score',
    description: 'Get a perfect score of 100% on any experiment',
    imageUrl: 'https://img.icons8.com/color/96/prize.png',
    earned: false,
  },
  {
    id: 'chemistry-whiz',
    name: 'Chemistry Whiz',
    description: 'Complete the Acid-Base Titration experiment with a score of 60% or higher',
    imageUrl: 'https://img.icons8.com/color/96/laboratory-flask.png',
    earned: false,
  },
  {
    id: 'physics-master',
    name: 'Physics Master',
    description: 'Complete the Ohm\'s Law experiment with a score of 60% or higher',
    imageUrl: 'https://img.icons8.com/color/96/physics.png',
    earned: false,
  },
  {
    id: 'wave-wizard',
    name: 'Wave Wizard',
    description: 'Complete the Wave Interference experiment with a score of 60% or higher',
    imageUrl: 'https://img.icons8.com/color/96/wavelength.png',
    earned: false,
  },
  // New custom badges
  {
    id: 'science-explorer',
    name: 'Science Explorer',
    description: 'Complete experiments in at least 2 different subjects',
    imageUrl: 'https://img.icons8.com/color/96/microscope.png',
    earned: false,
  },
  {
    id: 'quick-learner',
    name: 'Quick Learner',
    description: 'Complete any experiment in less than 10 minutes',
    imageUrl: 'https://img.icons8.com/color/96/running.png',
    earned: false,
  },
  {
    id: 'persistent-scientist',
    name: 'Persistent Scientist',
    description: 'Retry an experiment after failing it',
    imageUrl: 'https://img.icons8.com/color/96/determination.png',
    earned: false,
  },
  {
    id: 'master-of-all',
    name: 'Master of All',
    description: 'Complete all available experiments',
    imageUrl: 'https://img.icons8.com/color/96/graduation-cap.png',
    earned: false,
  },
  {
    id: 'voice-commander',
    name: 'Voice Commander',
    description: 'Successfully use 5 different voice commands',
    imageUrl: 'https://img.icons8.com/color/96/microphone.png',
    earned: false,
  }
];

// For demonstration purposes, mark some badges as earned
const sampleEarnedBadges = (badges: Badge[]): Badge[] => {
  try {
    return badges.map(badge => {
      // Mark specific badges as earned for the demo
      if (['first-experiment'].includes(badge.id)) {
        return {
          ...badge,
          earned: true,
          earnedDate: new Date().toISOString(),
        };
      }
      return badge;
    });
  } catch (error) {
    console.error('Error in sampleEarnedBadges:', error);
    return badges;
  }
};

// Create the store with persistence
export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      badges: sampleEarnedBadges(defaultBadges),
      progress: [],

      // Helper function to get a badge by ID
      getBadgeById: (badgeId: string) => {
        try {
          return get().badges.find(badge => badge.id === badgeId);
        } catch (error) {
          console.error('Error in getBadgeById:', error);
          return undefined;
        }
      },

      // Helper function to get all earned badges
      getEarnedBadges: () => {
        try {
          return get().badges.filter(badge => badge.earned);
        } catch (error) {
          console.error('Error in getEarnedBadges:', error);
          return [];
        }
      },

      // Helper function to get experiment progress
      getExperimentProgress: (experimentId: string) => {
        try {
          const experimentProgress = get().progress.find(p => p.experimentId === experimentId);
          
          if (experimentProgress) {
            return {
              progress: experimentProgress.score,
              completed: experimentProgress.completed,
            };
          }
          
          return { progress: 0, completed: false };
        } catch (error) {
          console.error('Error in getExperimentProgress:', error);
          return { progress: 0, completed: false };
        }
      },

      // Get the number of completed experiments
      getCompletedExperiments: () => {
        try {
          return get().progress.filter(p => p.completed).length;
        } catch (error) {
          console.error('Error in getCompletedExperiments:', error);
          return 0;
        }
      },

      // Earn a badge
      earnBadge: (badgeId: string) => {
        try {
          // Check if the badge exists and is not already earned
          const badge = get().badges.find(b => b.id === badgeId);
          
          if (!badge || badge.earned) {
            return;
          }
          
          // Update the badge
          set(state => ({
            badges: state.badges.map(b => 
              b.id === badgeId 
                ? { ...b, earned: true, earnedDate: new Date().toISOString() } 
                : b
            )
          }));
          
          // Show a notification
          useNotificationStore.getState().addNotification({
            title: 'New Badge Earned!',
            message: `You earned the "${badge.name}" badge!`,
            type: 'achievement'
          });
        } catch (error) {
          console.error('Error in earnBadge:', error);
        }
      },

      // Update experiment progress
      updateProgress: (experimentId: string, score: number) => {
        try {
          // Validate inputs
          if (!experimentId || typeof score !== 'number' || score < 0 || score > 100) {
            console.error('Invalid inputs to updateProgress:', { experimentId, score });
            return;
          }
          
          // Create a new progress object
          const newProgress = {
            experimentId,
            completed: score >= 60,
            score,
            attempts: 1,
            lastAttempt: new Date().toISOString(),
          };
          
          // Check if we already have progress for this experiment
          const existingProgress = get().progress.find(p => p.experimentId === experimentId);
          
          if (existingProgress) {
            // Update existing progress
            newProgress.attempts = existingProgress.attempts + 1;
            
            // Check if this is a retry after failing
            if (!existingProgress.completed && score >= 60) {
              get().earnBadge('persistent-scientist');
            }
          } else {
            // First time completing an experiment
            if (score >= 60) {
              get().earnBadge('first-experiment');
            }
          }
          
          // Update the progress state
          set(state => ({
            progress: [
              ...state.progress.filter(p => p.experimentId !== experimentId),
              newProgress
            ]
          }));
          
          // Check for perfect score badge
          if (score === 100) {
            get().earnBadge('perfect-score');
          }
          
          // Check for experiment-specific badges
          if (score >= 60) {
            if (experimentId === 'acid-base-titration') {
              get().earnBadge('chemistry-whiz');
            } else if (experimentId === 'ohms-law') {
              get().earnBadge('physics-master');
            } else if (experimentId === 'wave-interference') {
              get().earnBadge('wave-wizard');
            }
            
            // Check if all experiments are completed
            const completedExperiments = new Set(
              get().progress
                .filter(p => p.completed)
                .map(p => p.experimentId)
            );
            
            // Add the current experiment if it's completed
            if (score >= 60) {
              completedExperiments.add(experimentId);
            }
            
            // Check for science explorer badge (experiments in different subjects)
            const subjectMap = {
              'acid-base-titration': 'chemistry',
              'ohms-law': 'physics',
              'wave-interference': 'physics'
            };
            
            const completedSubjects = new Set(
              Array.from(completedExperiments)
                .map(id => subjectMap[id as keyof typeof subjectMap])
                .filter(Boolean)
            );
            
            if (completedSubjects.size >= 2) {
              get().earnBadge('science-explorer');
            }
            
            // Check for master of all badge
            const allExperiments = [
              'acid-base-titration', 
              'ohms-law', 
              'wave-interference'
            ];
            const allCompleted = allExperiments.every(id => completedExperiments.has(id));
            
            if (allCompleted) {
              get().earnBadge('master-of-all');
            }
          }
          
          // Show a notification about the progress
          useNotificationStore.getState().addNotification({
            title: score >= 60 ? 'Experiment Completed!' : 'Experiment Result',
            message: score >= 60 
              ? `Experiment completed with a score of ${score}%!` 
              : `You scored ${score}%. Try again to complete the experiment.`,
            type: score >= 60 ? 'achievement' : 'info'
          });
        } catch (error) {
          console.error('Error in updateProgress:', error);
        }
      },

      // Reset all progress
      resetProgress: () => {
        try {
          set({
            badges: defaultBadges,
            progress: [],
          });
          
          useNotificationStore.getState().addNotification({
            title: 'Progress Reset',
            message: 'All progress has been reset.',
            type: 'info'
          });
        } catch (error) {
          console.error('Error in resetProgress:', error);
        }
      },
    }),
    {
      name: 'gamification-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 