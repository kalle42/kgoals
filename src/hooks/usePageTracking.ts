import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export function usePageTracking() {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    // Google Tag Manager tracking
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        page: {
          path: location.pathname,
          title: document.title
        }
      });
    }

    // Track page view in Supabase
    async function trackPageView() {
      try {
        const pageView = {
          path: location.pathname,
          ...(user ? { user_id: user.id } : {})
        };

        const { error } = await supabase
          .from('page_views')
          .insert(pageView);

        if (error) {
          console.error('Supabase request failed', error);
        }
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    }

    trackPageView();
  }, [location, user]);
}