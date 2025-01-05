export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'coach';
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  hasPaidMembership: boolean;
}

export interface Coach {
  id: string;
  name: string;
  profession: string;
  bio: string;
  image_url: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
}