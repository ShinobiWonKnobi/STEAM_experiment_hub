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
    description: 'Complete the Pendulum Motion experiment with a score of 60% or higher',
    imageUrl: 'https://img.icons8.com/color/96/physics.png',
    earned: false,
  },
  {
    id: 'biology-expert',
    name: 'Biology Expert',
    description: 'Complete the DNA Extraction experiment with a score of 60% or higher',
    imageUrl: 'https://img.icons8.com/color/96/dna-helix.png',
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
          earnedDate: new Date().toISOString()
        };
      }
      return badge;
    });
  } catch (error) {
    console.error('Error in sampleEarnedBadges:', error);
    return badges;
  }
};

// Create a storage object with error handling
const createPersistentStorage = () => {
  return {
    getItem: (name: string): string | null => {
      try {
        const value = localStorage.getItem(name);
        return value;
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
      }
    },
    setItem: (name: string, value: string): void => {
      try {
        localStorage.setItem(name, value);
      } catch (error) {
        console.error('Error writing to localStorage:', error);
      }
    },
    removeItem: (name: string): void => {
      try {
        localStorage.removeItem(name);
      } catch (error) {
        console.error('Error removing from localStorage:', error);
      }
    },
  };
};

// Validate badge ID to prevent errors
const isValidBadgeId = (badgeId: string): boolean => {
  return typeof badgeId === 'string' && badgeId.trim() !== '';
};

// Validate experiment ID to prevent errors
const isValidExperimentId = (experimentId: string): boolean => {
  return typeof experimentId === 'string' && experimentId.trim() !== '';
};

// Validate score to prevent errors
const isValidScore = (score: number): boolean => {
  return typeof score === 'number' && !isNaN(score) && score >= 0 && score <= 100;
};

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      badges: sampleEarnedBadges(defaultBadges),
      progress: [],
      
      // Get a badge by ID
      getBadgeById: (badgeId: string) => {
        try {
          if (!isValidBadgeId(badgeId)) return undefined;
          return get().badges.find(b => b.id === badgeId);
        } catch (error) {
          console.error('Error in getBadgeById:', error);
          return undefined;
        }
      },
      
      // Get all earned badges
      getEarnedBadges: () => {
        try {
          return get().badges.filter(b => b.earned);
        } catch (error) {
          console.error('Error in getEarnedBadges:', error);
          return [];
        }
      },
      
      // Get progress for a specific experiment
      getExperimentProgress: (experimentId: string) => {
        try {
          if (!isValidExperimentId(experimentId)) {
            return { progress: 0, completed: false };
          }
          
          const experimentProgress = get().progress.find(p => p.experimentId === experimentId);
          return {
            progress: experimentProgress?.score || 0,
            completed: experimentProgress?.completed || false
          };
        } catch (error) {
          console.error('Error in getExperimentProgress:', error);
          return { progress: 0, completed: false };
        }
      },
      
      // Earn a badge
      earnBadge: (badgeId) => 
        set((state) => {
          try {
            // Validate badge ID
            if (!isValidBadgeId(badgeId)) {
              console.error('Invalid badge ID:', badgeId);
              return state;
            }
            
            const badge = state.badges.find(b => b.id === badgeId);
            if (!badge) {
              console.error('Badge not found:', badgeId);
              return state;
            }
            
            if (badge.earned) {
              // Badge already earned, no need to update
              return state;
            }
            
            // Send notification for earned badge
            try {
              useNotificationStore.getState().addNotification({
                title: 'New Badge Earned!',
                message: `Congratulations! You've earned the ${badge.name} badge.`,
                type: 'achievement'
              });
            } catch (error) {
              console.error('Error sending notification:', error);
            }
            
            // Update badge
            return {
              ...state,
              badges: state.badges.map((b) =>
                b.id === badgeId
                  ? { 
                      ...b, 
                      earned: true, 
                      earnedDate: new Date().toISOString() 
                    }
                  : b
              ),
            };
          } catch (error) {
            console.error('Error earning badge:', error);
            return state;
          }
        }),
      
      // Update experiment progress
      updateProgress: (experimentId, score) => 
        set((state) => {
          try {
            // Validate inputs
            if (!isValidExperimentId(experimentId)) {
              console.error('Invalid experiment ID:', experimentId);
              return state;
            }
            
            if (!isValidScore(score)) {
              console.error('Invalid score:', score);
              return state;
            }
            
            const existingProgress = state.progress.find(
              (p) => p.experimentId === experimentId
            );
            
            // Create new progress object
            const newProgress: ExperimentProgress = {
              experimentId,
              completed: score >= 60,
              score,
              attempts: (existingProgress?.attempts || 0) + 1,
              lastAttempt: new Date().toISOString(),
            };
            
            // Check for perfect score badge
            if (score === 100) {
              try {
                get().earnBadge('perfect-score');
              } catch (error) {
                console.error('Error earning perfect score badge:', error);
              }
            }
            
            // Check for first experiment completion
            if (!existingProgress?.completed && score >= 60) {
              try {
                get().earnBadge('first-experiment');
              } catch (error) {
                console.error('Error earning first experiment badge:', error);
              }
            }
            
            // Check for experiment-specific badges
            try {
              if (experimentId === 'acid-base-titration' && score >= 60) {
                get().earnBadge('chemistry-whiz');
              }
              
              if (experimentId === 'pendulum-motion' && score >= 60) {
                get().earnBadge('physics-master');
              }
              
              if (experimentId === 'dna-extraction' && score >= 60) {
                get().earnBadge('biology-expert');
              }
            } catch (error) {
              console.error('Error earning experiment-specific badge:', error);
            }
            
            // Check for persistent scientist badge (retry after failing)
            try {
              if (existingProgress && existingProgress.score < 60 && score >= 60) {
                get().earnBadge('persistent-scientist');
              }
            } catch (error) {
              console.error('Error earning persistent scientist badge:', error);
            }
            
            // Check for master of all badge
            try {
              const updatedProgress = [
                ...state.progress.filter((p) => p.experimentId !== experimentId),
                newProgress,
              ];
              
              // Get unique completed experiment IDs
              const completedExperimentIds = new Set(
                updatedProgress
                  .filter(p => p.completed)
                  .map(p => p.experimentId)
              );
              
              // Check if all experiments are completed
              const allExperiments = ['acid-base-titration', 'pendulum-motion', 'dna-extraction'];
              const allCompleted = allExperiments.every(id => completedExperimentIds.has(id));
              
              if (allCompleted) {
                get().earnBadge('master-of-all');
              }
              
              // Check for science explorer badge (experiments in different subjects)
              const subjectMap = {
                'acid-base-titration': 'chemistry',
                'pendulum-motion': 'physics',
                'dna-extraction': 'biology'
              };
              
              const completedSubjects = new Set(
                Array.from(completedExperimentIds)
                  .map(id => subjectMap[id as keyof typeof subjectMap])
              );
              
              if (completedSubjects.size >= 2) {
                get().earnBadge('science-explorer');
              }
            } catch (error) {
              console.error('Error checking for completion badges:', error);
            }
            
            // Update progress
            return {
              ...state,
              progress: [
                ...state.progress.filter((p) => p.experimentId !== experimentId),
                newProgress,
              ],
            };
          } catch (error) {
            console.error('Error updating progress:', error);
            return state;
          }
        }),
        
      // Get number of completed experiments
      getCompletedExperiments: () => {
        try {
          return get().progress.filter(p => p.completed).length;
        } catch (error) {
          console.error('Error getting completed experiments:', error);
          return 0;
        }
      },
      
      // Reset progress
      resetProgress: () => 
        set(() => {
          try {
            return {
              badges: defaultBadges,
              progress: [],
            };
          } catch (error) {
            console.error('Error resetting progress:', error);
            return {
              badges: defaultBadges,
              progress: [],
            };
          }
        }),
    }),
    {
      name: 'gamification-storage',
      storage: createJSONStorage(() => createPersistentStorage()),
      partialize: (state) => ({ 
        badges: state.badges, 
        progress: state.progress 
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          console.log('Gamification state hydrated successfully');
        } else {
          console.error('Failed to hydrate gamification state');
        }
      },
    }
  )
); 