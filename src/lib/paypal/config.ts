import { loadScript } from "@paypal/paypal-js";
import type { PayPalConfig } from './types';

export const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;

if (!PAYPAL_CLIENT_ID) {
  throw new Error('PayPal client ID is not configured');
}

export const paypalConfig: PayPalConfig = {
  "client-id": PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "subscription",
  vault: true,
  components: "buttons",
  "enable-funding": "paypal",
  "disable-funding": "card,paylater,venmo",
  "data-sdk-integration-source": "button-factory"
};