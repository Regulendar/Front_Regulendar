// api/graphql.ts  (serverless 엔트리)
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createApp } from '../src/main';

const cache: { handler?: any } = {};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!cache.handler) {
    const app = await createApp();
    cache.handler = app.getHttpAdapter().getInstance();
  }
  return cache.handler(req, res);
}
