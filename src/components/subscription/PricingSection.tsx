import React from 'react';
import { PricingCard } from './PricingCard';
import { subscriptionTiers } from '../../config/subscription';

export function PricingSection() {
  return (
    <div className="w-full">
      <div>
        <PricingCard tier={subscriptionTiers[0]} />
      </div>
    </div>
  );
}