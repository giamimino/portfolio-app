const API_URL = process.env.EXPO_PUBLIC_API_URL;

function api() {}

async function get<T>(endpoint: string): Promise<T> {
  const url = `${API_URL}/api/${endpoint}`;

  const res = await fetch(url);
  const data: T = await res.json();

  return data;
}

api.get = get;

export default api;
