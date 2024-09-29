const prefixKey = 'bht';

interface Storage<TData> {
  key: string;
  get: () => TData;
  set: (data: TData) => void;
  clear: () => void;
}

/**
 * Define a storage with a key and a fallback value
 * Under the hood, it uses localStorage to store the data
 *
 * @usage
 * ```ts
 * const storage = createStorage<Value>('key', initialValue);
 * storage.set(newValue); // change the value
 * const value = storage.get(); // read the value
 * storage.clear(); // clear the value
 * ```
 *
 * @param key - The key to identify in the storage
 * @param fallback - The fallback value if the data is undefined or null (default: null)
 */
function createStorage<TData>(key: string, fallback: TData): Storage<TData>;
function createStorage<TData>(key: string, fallback?: null): Storage<TData | null>;
function createStorage<TData>(key: string, fallback: TData | null = null): Storage<TData | null> {
  const storageKey = `${prefixKey}:${key}`;

  return {
    key: storageKey,

    get() {
      const data = localStorage.getItem(storageKey);

      if (!data && fallback !== null) {
        return fallback;
      }

      if (!data) {
        return null;
      }

      return JSON.parse(data) as TData;
    },

    set(data: TData | null) {
      localStorage.setItem(storageKey, JSON.stringify(data));
    },

    clear() {
      localStorage.removeItem(storageKey);
    },
  };
}

export { createStorage };
