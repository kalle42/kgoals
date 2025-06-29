import React, { useEffect, useRef, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { usePayPalInit } from '../../hooks/usePayPalInit';
import { subscriptionTiers } from '../../config/subscription';
import type { PayPalButtonStyle, PayPalSubscriptionData } from '../../lib/paypal/types';

interface PayPalButtonProps {
  onSuccess: (subscriptionId: string) => void;
  onError: (error: Error) => void;
}

const BUTTON_STYLE: PayPalButtonStyle = {
  shape: 'rect',
  color: 'gold',
  layout: 'vertical',
  label: 'paypal'
};

export function PayPalButton({ onSuccess, onError }: PayPalButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const buttonInstance = useRef<any>(null);
  const { loading, error, paypal } = usePayPalInit();

  const cleanupButton = useCallback(() => {
    if (buttonInstance.current?.close) {
      try {
        buttonInstance.current.close();
      } catch (err) {
        console.error('Error cleaning up PayPal button:', err);
      }
    }
    buttonInstance.current = null;
  }, []);

  const initializePayPalButton = useCallback(async () => {
    if (!paypal || !buttonRef.current) return;

    try {
      // Cleanup any existing button
      cleanupButton();

      // Create new button instance
      buttonInstance.current = await paypal.Buttons({
        style: BUTTON_STYLE,
        fundingSource: paypal.FUNDING.PAYPAL,
        createSubscription: (_data: any, actions: any) => {
          return actions.subscription.create({
            plan_id: subscriptionTiers[0].planId
          });
        },
        onApprove: (data: PayPalSubscriptionData) => {
          if (data.subscriptionID) {
            onSuccess(data.subscriptionID);
          } else {
            onError(new Error('No subscription ID received'));
          }
        },
        onError: (err: any) => {
          console.error('PayPal Error:', err);
          onError(err instanceof Error ? err : new Error('PayPal subscription failed'));
        }
      });

      if (!buttonInstance.current.isEligible()) {
        throw new Error('PayPal Buttons are not eligible');
      }

      await buttonInstance.current.render(buttonRef.current);
    } catch (err) {
      console.error('PayPal render error:', err);
      onError(err instanceof Error ? err : new Error('Failed to render PayPal button'));
    }
  }, [paypal, onSuccess, onError, cleanupButton]);

  useEffect(() => {
    initializePayPalButton();
    return cleanupButton;
  }, [initializePayPalButton, cleanupButton]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center py-4">
        Failed to load PayPal: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <div className="text-lg font-medium">
          Start Your 14-Day Free Trial
        </div>
        <div className="text-sm text-gray-600">
          Then $10/year - Cancel anytime
        </div>
      </div>
      <div ref={buttonRef} />
      <div className="text-sm text-gray-500 text-center">
        Secure payment processing by PayPal
      </div>
    </div>
  );
}