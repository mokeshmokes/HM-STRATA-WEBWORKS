'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { useRealtimeUpdates } from '@/lib/useRealtimeUpdates';

/**
 * Inner component — needs to be inside <Provider> so
 * useDispatch() (used by the hook) works correctly.
 */
function RealtimeBridge({ children }) {
  useRealtimeUpdates();
  return children;
}

export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <RealtimeBridge>
        {children}
      </RealtimeBridge>
    </Provider>
  );
}
