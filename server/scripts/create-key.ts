import { generateApiKey, hashApiKey } from "../src/lib/auth/ApiKeys";

const key = generateApiKey();
console.log("Client key (EXPO_PUBLIC_API_KEY):", key);
console.log("Server hash (add to API_KEY_HASHES):", hashApiKey(key));