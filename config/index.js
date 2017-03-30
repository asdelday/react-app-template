import { HOST, PORT, NODE_ENV, PROTOCOL } from './env';

export const isProduction = NODE_ENV === 'production';
export const isDevelopment = NODE_ENV === 'development';
export const isClient = typeof window !== 'undefined';

export const baseURL = `${PROTOCOL}://${HOST}:${PORT}`;
