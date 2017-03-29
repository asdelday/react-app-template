/**
 * env.js
 *
 * All the environment variables goes here with the purpose to be easily imported.
 */
export const ENV = process.env.NODE_ENV || 'development';
export const HOST = process.env.HOST || 'localhost';
export const PORT = process.env.PORT || '3000';
export const PROTOCOL = process.env.PROTOCOL || 'http';
