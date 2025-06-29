import { loadStripe } from '@stripe/stripe-js';
import { supabase } from './supabase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export async function createCheckoutSession(priceId: string) {
  if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
    throw new Error('Stripe public key is not configured');
  }

  const { data, error: supabaseError } = await supabase.functions.invoke('create-checkout-session', {
    body: { priceId }
  });

  if (supabaseError || !data?.sessionId) {
    throw new Error(supabaseError?.message || 'Failed to create checkout session');
  }

  const stripe = await stripePromise;
  if (!stripe) {
    throw new Error('Stripe failed to initialize');
  }

  const { error: stripeError } = await stripe.redirectToCheckout({
    sessionId: data.sessionId
  });

  if (stripeError) {
    throw new Error(stripeError.message || 'Stripe checkout failed');
  }
}