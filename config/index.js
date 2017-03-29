import { HOST, PORT, ENV, PROTOCOL } from './env'

export const isProduction = ENV === 'production';
export const isDevelopment = ENV === 'development';
export const isClient = typeof window !== 'undefined';

export const baseURL = `${PROTOCOL}://${HOST}:${PORT}`;
