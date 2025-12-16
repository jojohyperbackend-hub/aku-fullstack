import { defineEventHandler, getQuery, getHeader, readBody, sendError, createError } from 'h3';
import bcrypt from 'bcryptjs'; // optional jika mau hash password

type Item = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

// in-memory store (DEV ONLY)
let items: Item[] = [];
let idCounter = 1;

// ambil username & password dari .env
const ADMIN_USERNAME = import.meta.env['VITE_ADMIN_USERNAME'];
const ADMIN_PASSWORD = import.meta.env['VITE_ADMIN_PASSWORD']; // plaintext, bisa diganti hash

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const action = query.action;

  // auth sederhana pakai header
  const user = getHeader(event, 'x-user');
  const pass = getHeader(event, 'x-pass');

  if (!user || !pass || user !== ADMIN_USERNAME || pass !== ADMIN_PASSWORD) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }));
  }

  // ===== LIST =====
  if (action === 'list') {
    return items;
  }

  // ===== ADD =====
  if (action === 'add') {
    const body = await readBody(event);

    if (!body?.name) {
      return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid body' }));
    }

    items.push({
      id: idCounter++,
      name: body.name,
      price: Number(body.price) || 0,
      stock: Number(body.stock) || 0,
    });

    return items;
  }

  // ===== DELETE =====
  if (action === 'delete') {
    const body = await readBody(event);

    if (!body?.id) {
      return sendError(event, createError({ statusCode: 400, statusMessage: 'Missing id' }));
    }

    items = items.filter((i) => i.id !== Number(body.id));
    return items;
  }

  return sendError(event, createError({ statusCode: 400, statusMessage: 'Unknown action' }));
});
