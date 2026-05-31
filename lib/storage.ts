export interface VoidStorage {
  history: any[];
  watchlist: any[];
  favorites: any[];
  searchHistory: string[];
  settings: {
    lastSourceId?: string;
    autoPlayNext?: boolean;
  };
  preferences?: any;
}

const STORAGE_KEY = 'voidstream_app_state_v2'; // versioned schema migration

const defaultState: VoidStorage = {
  history: [],
  watchlist: [],
  favorites: [],
  searchHistory: [],
  settings: {
    autoPlayNext: true
  }
};

export const storage = {
  get: (): VoidStorage => {
    if (typeof window === 'undefined') return defaultState;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to parse local storage, resetting to default', e);
    }
    return defaultState;
  },
  set: (data: Partial<VoidStorage>) => {
    if (typeof window === 'undefined') return;
    try {
      const current = storage.get();
      // Safe stringify to handle unexpected circular references just in case
      const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (_key: string, value: any) => {
          if (typeof value === "object" && value !== null) {
            try {
              if (value instanceof Element || ('nodeType' in value && typeof value.nodeType === 'number') || value instanceof Event) return "[DOM Node/Event]";
            } catch (_) { /* ignore */ }
            if (seen.has(value)) {
              return;
            }
            seen.add(value);
          }
          return value;
        };
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...data }, getCircularReplacer()));
    } catch (e) {
      console.warn('Failed to save to local storage', e);
    }
  },
  clear: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  }
};
