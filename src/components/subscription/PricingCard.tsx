import React from 'react';
import { Check } from 'lucide-react';
import type { SubscriptionTier } from '../../types';
import { CheckoutButton } from './CheckoutButton';

interface PricingCardProps {
  tier: SubscriptionTier;
  isCurrentPlan?: boolean;
}

export function PricingCard({ tier, isCurrentPlan }: PricingCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-2">{tier.name}</h3>
        <div className="text-5xl font-bold mb-2">${tier.price}</div>
        <div className="text-gray-500">per year</div>
      </div>
      
      <ul className="space-y-4 mb-8">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {!isCurrentPlan && tier.priceId && (
        <CheckoutButton priceId={tier.priceId} />
      )}
      {isCurrentPlan && (
        <div className="w-full py-3 px-4 bg-gray-100 text-gray-800 rounded-md text-center text-lg font-medium">
          Current Plan
        </div>
      )}
    </div>
  );
}