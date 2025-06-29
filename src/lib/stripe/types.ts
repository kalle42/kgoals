import type { Stripe } from '@stripe/stripe-js';

export interface CheckoutSessionResponse {
  sessionId: string;
}

export interface StripeError {
  type: 'api_error' | 'validation_error' | 'authentication_error';
  message: string;
}

export interface CreateCheckoutSessionParams {
  priceId: string;
}

export interface StripeConfig {
  publicKey: string | undefined;
}