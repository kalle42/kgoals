import { getStripeInstance } from './config';
import { supabase } from '../supabase';
import type { CreateCheckoutSessionParams, CheckoutSessionResponse } from './types';

export async function createCheckoutSession({ priceId }: CreateCheckoutSessionParams) {
  try {
    // Get checkout session from Supabase function
    const { data, error: supabaseError } = await supabase.functions.invoke<CheckoutSessionResponse>(
      'create-checkout-session',
      {
        body: { priceId }
      }
    );

    if (supabaseError || !data?.sessionId) {
      throw new Error(supabaseError?.message || 'Failed to create checkout session');
    }

    // Initialize Stripe and redirect to checkout
    const stripe = await getStripeInstance();
    const { error: stripeError } = await stripe.redirectToCheckout({
      sessionId: data.sessionId
    });

    if (stripeError) {
      throw new Error(stripeError.message || 'Stripe checkout failed');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Checkout failed: ${error.message}`);
    }
    throw new Error('An unexpected error occurred during checkout');
  }
}