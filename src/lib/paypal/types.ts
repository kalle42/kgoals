export interface PayPalConfig {
  "client-id": string;
  currency: string;
  intent: string;
  vault: boolean;
  components: string;
  "enable-funding": string;
  "disable-funding": string;
  "data-sdk-integration-source": string;
}

export interface PayPalButtonStyle {
  shape: 'rect';
  color: 'gold';
  layout: 'vertical';
  label: 'paypal';
}

export interface PayPalSubscriptionData {
  subscriptionID: string;
}