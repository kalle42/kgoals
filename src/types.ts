export interface Habit {
  id: string;
  name: string;
  checks: Record<string, number>;
  type: 'positive' | 'negative';
}

export interface DragItem {
  type: string;
  id: string;
  index: number;
}

export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  features: string[];
  priceId: string;
}

export interface UserSubscription {
  tier: string;
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodEnd: string;
}