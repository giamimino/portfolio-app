import crypto from 'node:crypto';

const PREFIX = 'pk_live_';

export function generateApiKey(): string {
  return PREFIX + crypto.randomBytes(32).toString('hex');
}

export function hashApiKey(key: string): string {
  return crypto.createHash('sha256').update(key).digest('hex');
}

function validHashes(): string[] {
  return (process.env.API_KEY_HASHES ?? '')
    .split(',')
    .map(h => h.trim())
    .filter(Boolean);
}

export function verifyApiKey(key: string): boolean {
  if (!key.startsWith(PREFIX)) return false;
  const incoming = Buffer.from(hashApiKey(key));
  return validHashes().some(h => {
    const stored = Buffer.from(h);
    return (
      stored.length === incoming.length &&
      crypto.timingSafeEqual(stored, incoming)
    );
  });
}

export function extractBearerToken(header: string | null): string | null {
  if (!header) return null;
  const [scheme, token] = header.split(' ');
  return scheme?.toLowerCase() === 'bearer' && token ? token : null;
}
