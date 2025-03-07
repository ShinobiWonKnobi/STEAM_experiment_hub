import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'achievement' | 'info' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  settings: {
    achievements: boolean;
    progress: boolean;
    system: boolean;
    email: boolean;
  };
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  clearAllNotifications: () => void;
  updateSettings: (settings: Partial<NotificationState['settings']>) => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: [],
      settings: {
        achievements: true,
        progress: true,
        system: true,
        email: false,
      },
      addNotification: (notification) =>
        set((state) => {
          // Keep only the last 50 notifications
          const notifications = [
            {
              ...notification,
              id: Math.random().toString(36).substring(2),
              read: false,
              createdAt: new Date().toISOString(),
            },
            ...state.notifications,
          ].slice(0, 50);

          return { notifications };
        }),
      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
      clearNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      clearAllNotifications: () =>
        set(() => ({
          notifications: [],
        })),
      updateSettings: (settings) =>
        set((state) => ({
          settings: { ...state.settings, ...settings },
        })),
    }),
    {
      name: 'notification-storage',
    }
  )
); 