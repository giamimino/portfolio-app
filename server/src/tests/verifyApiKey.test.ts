import { generateApiKey, hashApiKey } from '../lib/auth/ApiKeys';
import withApiKey from '../lib/auth/withApiKey';
import { NextRequest } from 'next/server';
import { beforeAll, describe, expect, it } from 'vitest';

const key = generateApiKey();
const handler = withApiKey(async () => new Response('ok'));
const req = (auth?: string) =>
  new NextRequest('http://localhost/api/x', {
    headers: auth ? { authorization: auth } : {},
  });

beforeAll(() => {
  process.env.API_KEY_HASHES = hashApiKey(key);
});

describe('withApiKey', () => {
  it('401 without header', async () => {
    expect((await handler(req(), {})).status).toBe(401);
  });
  it('401 with wrong key', async () => {
    expect((await handler(req('Bearer pk_live_nope'), {})).status).toBe(401);
  });
  it('200 with valid key', async () => {
    expect((await handler(req(`Bearer ${key}`), {})).status).toBe(200);
  });
});
