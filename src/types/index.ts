
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  reputation: number;
  role: 'guest' | 'user' | 'admin';
  createdAt: Date;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  tags: string[];
  authorId: string;
  author: User;
  votes: number;
  answers: Answer[];
  acceptedAnswerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Answer {
  id: string;
  content: string;
  questionId: string;
  authorId: string;
  author: User;
  votes: number;
  isAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vote {
  id: string;
  userId: string;
  targetId: string; // questionId or answerId
  targetType: 'question' | 'answer';
  type: 'up' | 'down';
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'answer' | 'comment' | 'mention' | 'accepted';
  message: string;
  targetId: string;
  isRead: boolean;
  createdAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  description?: string;
  questionsCount: number;
}
