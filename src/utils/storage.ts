const storagePrefix = '_vitr_';

export const storage = {
	get: <TValue = unknown>(key: string, defaultValue?: TValue) => {
		try {
			const item = window.localStorage.getItem(`${storagePrefix}_${key}`);
			return item ? (JSON.parse(item) as TValue) : defaultValue;
		} catch (error: unknown) {
			return defaultValue;
		}
	},

	set: <TValue = unknown>(key: string, value: TValue) => {
		try {
			window.localStorage.setItem(`${storagePrefix}_${key}`, JSON.stringify(value));
		} catch {
			//
		}
	},

	remove: (key: string) => window.localStorage.removeItem(`${storagePrefix}_${key}`),
};
