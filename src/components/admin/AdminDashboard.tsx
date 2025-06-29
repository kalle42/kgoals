import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { BarChart, Users, Activity } from 'lucide-react';

interface PageView {
  path: string;
  count: number;
}

interface UserEvent {
  event_type: string;
  count: number;
  created_at: string;
}

export function AdminDashboard() {
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [userEvents, setUserEvents] = useState<UserEvent[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch page views
        const { data: viewsData } = await supabase
          .from('page_views')
          .select('path, created_at')
          .order('created_at', { ascending: false });

        // Fetch user events
        const { data: eventsData } = await supabase
          .from('user_events')
          .select('event_type, created_at')
          .order('created_at', { ascending: false });

        // Fetch total users
        const { count } = await supabase
          .from('auth.users')
          .select('*', { count: 'exact' });

        if (viewsData) {
          const viewCounts = viewsData.reduce((acc: Record<string, number>, view) => {
            acc[view.path] = (acc[view.path] || 0) + 1;
            return acc;
          }, {});

          setPageViews(
            Object.entries(viewCounts).map(([path, count]) => ({ path, count }))
          );
        }

        if (eventsData) {
          const eventCounts = eventsData.reduce((acc: Record<string, number>, event) => {
            acc[event.event_type] = (acc[event.event_type] || 0) + 1;
            return acc;
          }, {});

          setUserEvents(
            Object.entries(eventCounts).map(([event_type, count]) => ({
              event_type,
              count,
              created_at: new Date().toISOString() // Using current date as placeholder
            }))
          );
        }

        if (count !== null) {
          setTotalUsers(count);
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    
    // Set up real-time subscriptions
    const pageViewsSubscription = supabase
      .channel('page_views_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'page_views'
      }, () => {
        fetchData();
      })
      .subscribe();

    const userEventsSubscription = supabase
      .channel('user_events_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_events'
      }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      pageViewsSubscription.unsubscribe();
      userEventsSubscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-3xl font-bold">{totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Total Page Views</h3>
              <p className="text-3xl font-bold">
                {pageViews.reduce((sum, view) => sum + view.count, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <BarChart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">User Events</h3>
              <p className="text-3xl font-bold">
                {userEvents.reduce((sum, event) => sum + event.count, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Page Views</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Path</th>
                  <th className="text-right py-2">Views</th>
                </tr>
              </thead>
              <tbody>
                {pageViews.map((view) => (
                  <tr key={view.path} className="border-b">
                    <td className="py-2">{view.path}</td>
                    <td className="text-right py-2">{view.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">User Events</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Event Type</th>
                  <th className="text-right py-2">Count</th>
                </tr>
              </thead>
              <tbody>
                {userEvents.map((event) => (
                  <tr key={event.event_type} className="border-b">
                    <td className="py-2">{event.event_type}</td>
                    <td className="text-right py-2">{event.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}