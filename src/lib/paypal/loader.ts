import { loadScript } from "@paypal/paypal-js";
import { paypalConfig } from './config';

let paypalPromise: Promise<any> | null = null;

export async function loadPayPalScript() {
  if (paypalPromise) {
    return paypalPromise;
  }

  paypalPromise = new Promise(async (resolve, reject) => {
    try {
      const paypal = await loadScript(paypalConfig);
      if (!paypal) {
        throw new Error("PayPal SDK failed to load");
      }
      
      // Wait for PayPal to be fully initialized
      if (!window.paypal?.Buttons) {
        throw new Error("PayPal Buttons not available");
      }
      
      resolve(paypal);
    } catch (error) {
      paypalPromise = null;
      console.error("Failed to load PayPal script:", error);
      reject(error);
    }
  });

  return paypalPromise;
}