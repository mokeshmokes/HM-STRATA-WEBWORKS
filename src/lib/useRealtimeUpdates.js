'use client';

import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPortfolio } from '@/redux/slices/portfolioSlice';
import { fetchTestimonials } from '@/redux/slices/testimonialsSlice';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

/**
 * useRealtimeUpdates — subscribes to the server's SSE stream.
 *
 * When the admin dashboard changes a portfolio item or testimonial,
 * the server broadcasts an event and this hook re-fetches the relevant
 * slice — updating the UI instantly without a page reload.
 */
export function useRealtimeUpdates() {
  const dispatch   = useDispatch();
  const esRef      = useRef(null);
  const retryRef   = useRef(null);
  const retryDelay = useRef(1000);

  useEffect(() => {
    // SSE is browser-only
    if (typeof window === 'undefined') return;

    function connect() {
      // Close any existing connection
      if (esRef.current) esRef.current.close();

      const es = new EventSource(`${API_URL}/api/events`);
      esRef.current = es;

      es.addEventListener('connected', () => {
        console.log('🔴 SSE connected — real-time updates active');
        retryDelay.current = 1000; // reset backoff on successful connect
      });

      es.addEventListener('portfolio', () => {
        console.log('🔄 SSE → portfolio changed, re-fetching…');
        dispatch(fetchPortfolio());
      });

      es.addEventListener('testimonials', () => {
        console.log('🔄 SSE → testimonials changed, re-fetching…');
        dispatch(fetchTestimonials());
      });

      es.onerror = () => {
        es.close();
        esRef.current = null;
        // Exponential back-off: 1s → 2s → 4s → … up to 30s
        retryDelay.current = Math.min(retryDelay.current * 2, 30_000);
        console.warn(`SSE disconnected — retrying in ${retryDelay.current / 1000}s`);
        retryRef.current = setTimeout(connect, retryDelay.current);
      };
    }

    connect();

    return () => {
      if (esRef.current)  esRef.current.close();
      if (retryRef.current) clearTimeout(retryRef.current);
    };
  }, [dispatch]);
}
