import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserSettings {
  displayName: string;
  email: string;
  institution: string;
  role: string;
  avatar: string;
  theme: {
    mode: 'light' | 'dark';
    primaryColor: string;
    secondaryColor: string;
  };
  notifications: {
    achievements: boolean;
    progress: boolean;
    system: boolean;
    email: boolean;
  };
  privacy: {
    publicProfile: boolean;
    shareProgress: boolean;
    shareAchievements: boolean;
  };
}

export interface SettingsState extends UserSettings {
  updateProfile: (profile: Partial<Pick<UserSettings, 'displayName' | 'email' | 'institution' | 'role' | 'avatar'>>) => void;
  updateTheme: (theme: Partial<UserSettings['theme']>) => void;
  updateNotifications: (notifications: Partial<UserSettings['notifications']>) => void;
  updatePrivacy: (privacy: Partial<UserSettings['privacy']>) => void;
}

const defaultSettings: UserSettings = {
  displayName: 'Guest User',
  email: '',
  institution: '',
  role: 'Student',
  avatar: 'https://ui-avatars.com/api/?name=Guest+User',
  theme: {
    mode: 'light',
    primaryColor: '#1976d2',
    secondaryColor: '#9c27b0',
  },
  notifications: {
    achievements: true,
    progress: true,
    system: true,
    email: false,
  },
  privacy: {
    publicProfile: false,
    shareProgress: false,
    shareAchievements: true,
  },
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,
      updateProfile: (profile) => set((state) => ({ ...state, ...profile })),
      updateTheme: (theme) => set((state) => ({ ...state, theme: { ...state.theme, ...theme } })),
      updateNotifications: (notifications) => 
        set((state) => ({ ...state, notifications: { ...state.notifications, ...notifications } })),
      updatePrivacy: (privacy) => set((state) => ({ ...state, privacy: { ...state.privacy, ...privacy } })),
    }),
    {
      name: 'settings-storage',
    }
  )
); 