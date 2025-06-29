import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { createCheckoutSession } from '../../lib/stripe';

interface CheckoutButtonProps {
  priceId: string;
}

export function CheckoutButton({ priceId }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError(null);
      await createCheckoutSession({ priceId });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to start checkout';
      setError(errorMessage);
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full py-3 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          'Get Started Now'
        )}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}