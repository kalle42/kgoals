import { useState, useEffect } from 'react';
import { loadPayPalScript } from '../lib/paypal/loader';

export function usePayPalInit() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [paypal, setPaypal] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (!mounted) return;

      try {
        setLoading(true);
        setError(null);
        const paypalInstance = await loadPayPalScript();
        
        if (!mounted) return;
        
        if (!paypalInstance) {
          throw new Error('PayPal failed to initialize');
        }

        setPaypal(paypalInstance);
      } catch (err) {
        if (!mounted) return;
        const errorMessage = err instanceof Error ? err.message : 'Failed to load PayPal';
        setError(new Error(errorMessage));
        console.error('PayPal initialization error:', err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  return { loading, error, paypal };
}