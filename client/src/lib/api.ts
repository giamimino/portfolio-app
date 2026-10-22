import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL?.trim();
const TOKEN = process.env.EXPO_PUBLIC_API_KEY?.trim();
const VERSION = 1;
const CACHE_KEY = '@myapp/cache';
const EXPIERS_IN = 1000 * 60 * 60 * 24 * 12; // 12 days

function getUrl(endpoint: string): string {
  if (!API_URL) {
    throw new Error('EXPO_PUBLIC_API_URL is not configured for this build.');
  }

  if (!TOKEN) {
    throw new Error('EXPO_PUBLIC_API_KEY is not configured for this build.');
  }

  return `${API_URL.replace(/\/+$/, '')}/api/v${VERSION}/${endpoint}`;
}

async function getResponse<T>(url: string, init: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(
      `API request failed with ${res.status} ${res.statusText}: ${url}`,
    );
  }

  return res.json() as Promise<T>;
}

async function get<T>(endpoint: string, cache = false): Promise<T> {
  const url = getUrl(endpoint);

  if (cache) {
    const keys = await AsyncStorage.getAllKeys();
    const cachedKeys = keys.filter(k => k.startsWith(CACHE_KEY));
    const cachedKey = cachedKeys.find(c => c.split(':')[1] === endpoint);

    if (cachedKey) {
      const parts = cachedKey.split(':')[0].split('/');
      const createdAt = Number(parts[2]);

      if (Number.isFinite(createdAt)) {
        const expiresAt = createdAt + EXPIERS_IN;
        const now = new Date().getTime();
        const storage_key = `${CACHE_KEY}/${createdAt}:${endpoint}`;

        if (now < expiresAt) {
          const cachedData = await AsyncStorage.getItem(storage_key);

          if (cachedData !== null) {
            let parsedData: T | undefined;
            try {
              parsedData = JSON.parse(cachedData);
            } catch {}

            if (parsedData !== undefined) {
              return parsedData;
            }
          }
        } else {
          await AsyncStorage.removeItem(storage_key);
        }
      }
    }
  }

  const data = await getResponse<T>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (cache) {
    const keys = await AsyncStorage.getAllKeys();
    const cachedKeys = keys.filter(k => k.startsWith(CACHE_KEY));
    if (cachedKeys.some(c => c.startsWith(CACHE_KEY) && c.includes(endpoint)))
      return data;

    const storageKey = `${CACHE_KEY}/${new Date().getTime()}:${endpoint}`;
    await AsyncStorage.setItem(storageKey, JSON.stringify(data)).catch(
      () => {},
    );
  }

  return data;
}

async function post<T, R>(endpoint: string, body: R): Promise<T> {
  const url = getUrl(endpoint);

  return getResponse<T>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(body),
  });
}

const api = { get, post };
export default api;
