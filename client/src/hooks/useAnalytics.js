import { useState, useEffect, useCallback } from 'react';
import { analyticsApi } from '../api/client';
import { useDateRange } from '../context/DateRangeContext';

export function useAnalytics() {
  const { dateRange } = useDateRange();
  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState([]);
  const [breakdowns, setBreakdowns] = useState({ categories: [], expenses: [] });
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (dateRange.startDate) params.startDate = dateRange.startDate;
      if (dateRange.endDate) params.endDate = dateRange.endDate;

      const [s, t, b] = await Promise.all([
        analyticsApi.summary(params),
        analyticsApi.trends(params),
        analyticsApi.breakdowns(params),
      ]);
      setSummary(s);
      setTrends(t);
      setBreakdowns(b);
    } catch (err) {
      console.error('Analytics fetch failed:', err);
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => { refresh(); }, [refresh]);

  return { summary, trends, breakdowns, loading, refresh };
}
