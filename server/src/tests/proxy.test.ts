import { describe, it, expect, beforeAll } from 'vitest';
import { NextRequest } from 'next/server';
import { generateApiKey, hashApiKey } from '../lib/auth/ApiKeys';
import { proxy } from '../proxy';

const key = generateApiKey();
const req = (auth?: string) =>
  new NextRequest('http://localhost/api/projects', {
    headers: auth ? { authorization: auth } : {},
  });

beforeAll(() => {
  process.env.API_KEY_HASHES = hashApiKey(key);
});

describe('middleware', () => {
  it('rejects a missing header', async () => {
    const res = await proxy(req());
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({
      error: {
        code: 'UNAUTHORIZED',
        message: '',
      },
      success: false,
    });
    expect(res.headers.get('www-authenticate')).toBe('Bearer');
  });

  it('rejects a wrong key', async () => {
    expect((await proxy(req('Bearer pk_live_nope'))).status).toBe(401);
  });

  it('rejects a non-Bearer scheme', async () => {
    expect((await proxy(req(`Basic ${key}`))).status).toBe(401);
  });

  it('lets a valid key through', async () => {
    const res = await proxy(req(`Bearer ${key}`));
    expect(res.status).toBe(200);
    expect(res.headers.get('x-middleware-next')).toBe('1');
  });
});
