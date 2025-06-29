import { loadStripe } from '@stripe/stripe-js';
import type { StripeConfig } from './types';

export const stripeConfig: StripeConfig = {
  publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
};

export const getStripeInstance = async () => {
  if (!stripeConfig.publicKey) {
    throw new Error('Stripe public key is not configured');
  }
  
  const stripe = await loadStripe(stripeConfig.publicKey);
  if (!stripe) {
    throw new Error('Failed to initialize Stripe');
  }
  
  return stripe;
};