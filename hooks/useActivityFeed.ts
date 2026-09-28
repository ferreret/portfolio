import { useEffect, useState } from 'react';
import { ActivityFeed } from '@/types';

// activity.json feeds both the ticker and the GitHub languages card: share one
// request per page load instead of fetching it twice.
let request: Promise<ActivityFeed> | null = null;

const loadFeed = () => {
  request ??= fetch('/activity.json', { cache: 'no-cache' })
    .then(res => (res.ok ? res.json() : Promise.reject(new Error(`activity.json ${res.status}`))))
    .catch(err => {
      request = null; // allow a retry on the next mount
      throw err;
    });
  return request;
};

export type ActivityFeedStatus = 'loading' | 'ready' | 'error';

export function useActivityFeed() {
  const [feed, setFeed] = useState<ActivityFeed | null>(null);
  const [status, setStatus] = useState<ActivityFeedStatus>('loading');

  useEffect(() => {
    let cancelled = false;
    loadFeed().then(
      data => { if (!cancelled) { setFeed(data); setStatus('ready'); } },
      () => { if (!cancelled) setStatus('error'); },
    );
    return () => { cancelled = true; };
  }, []);

  return { feed, status };
}
