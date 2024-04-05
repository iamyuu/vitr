export interface AuthSession {
	user: {
		name: string;
		email: string;
	};
	// Maybe have permissions in the future
	// permissions: string[];
}
