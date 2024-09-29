import { createStore } from '@xstate/store';
import { useSelector } from '@xstate/store/react';
import { setMonitoringUser } from '~/utils/monitoring';
import { createStorage } from '~/utils/storage';
import type { AuthSession } from '../types/session.type';

const initialValue: AuthSession = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authStorage = createStorage<AuthSession>('auth', initialValue);

export const authStore = createStore(authStorage.get(), {
  /**
   * Set the auth session and save it to the storage
   * Used for logging in
   */
  set(_context, event: { payload: AuthSession }) {
    authStorage.set(event.payload);
    setMonitoringUser({ email: event.payload.user?.email });

    return event.payload;
  },

  /**
   * Reset the auth session and clear the storage
   * Used for logging out
   */
  clear() {
    authStorage.clear();
    setMonitoringUser(null);

    return initialValue;
  },
});

export function useAuth() {
  return useSelector(authStore, (state) => state.context);
}

export function useAuthUser() {
  return useSelector(authStore, (state) => state.context.user);
}
