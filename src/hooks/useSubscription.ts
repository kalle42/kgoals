import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { UserSubscription } from '../types';

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchSubscription() {
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        setSubscription(data);
      } catch (err) {
        console.error('Error fetching subscription:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSubscription();
  }, [user]);

  return { subscription, loading };
}