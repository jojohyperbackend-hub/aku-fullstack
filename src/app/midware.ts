import { defineEventHandler, getHeader, sendError, createError, eventHandler } from 'h3';

// ambil username & password dari env
const ADMIN_USERNAME = import.meta.env['VITE_ADMIN_USERNAME'];
const ADMIN_PASSWORD = import.meta.env['VITE_ADMIN_PASSWORD'];

export const authMiddleware = defineEventHandler(async (event) => {

  const url = event.req.url || '';
  if (url.startsWith('/auth')) return; // bypass login page

  const user = getHeader(event, 'x-user');
  const pass = getHeader(event, 'x-pass');

  if (!user || !pass || user !== ADMIN_USERNAME || pass !== ADMIN_PASSWORD) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }));
  }
});
