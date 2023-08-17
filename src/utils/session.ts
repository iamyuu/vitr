import { useQuery } from '@tanstack/react-query';
import { storage } from '~/utils/storage';

type AuthSession = {
	token: string;
};

const STORAGE_KEY = 'session';

export function getToken() {
	return storage.get<AuthSession>(STORAGE_KEY)?.token;
}

export function setToken(newSession: AuthSession) {
	return storage.set<AuthSession>(STORAGE_KEY, newSession);
}

export function flushSession() {
	storage.remove(STORAGE_KEY);
}

export function useSession() {
	return useQuery({
		queryKey: ['session'],
		enabled: typeof getToken() === 'string',
	});
}
