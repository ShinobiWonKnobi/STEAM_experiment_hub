export interface Experiment {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  comingSoon?: boolean;
}

export interface VoiceCommand {
  command: string;
  description: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  earned: boolean;
  earnedDate?: string;
}

export interface ExperimentProgress {
  experimentId: string;
  completed: boolean;
  score: number;
  attempts: number;
  lastAttempt: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
} 