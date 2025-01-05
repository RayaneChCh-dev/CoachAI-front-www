import { MembershipPlan } from '../types';

export const membershipPlans: MembershipPlan[] = [
  {
    id: 'free',
    name: 'Free Plan',
    description: 'Perfect for getting started',
    price: 0,
    features: [
      'Access to basic coaching content',
      'Chat with 2 coaches per month',
      'Basic progress tracking',
      'Community forum access',
      'Email support'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    description: 'For serious professionals',
    price: 29.99,
    features: [
      'Unlimited access to all coaching content',
      'Unlimited coach chats',
      'Advanced progress tracking',
      'Priority support 24/7',
      'Exclusive workshops and webinars',
      'Custom learning paths',
      'One-on-one mentoring sessions'
    ]
  }
];