import {
  defineEventHandler,
  getQuery,
  getHeader,
  readBody,
  sendError,
  createError,
} from 'h3';

type Item = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

// In-memory store (DEV ONLY)
let items: Item[] = [];
let idCounter = 1;

export default defineEventHandler(async (event) => {
  // Ambil query param
  const query = getQuery(event);
  const action = query.action;

  // Auth sederhana via header x-user
  const user = getHeader(event, 'x-user');
  if (!user) {
    return sendError(
      event,
      createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    );
  }

  // ===== LIST =====
  if (action === 'list') {
    return items;
  }

  // ===== ADD =====
  if (action === 'add') {
    const body = await readBody(event);

    if (!body?.name || typeof body.price !== 'number' || typeof body.stock !== 'number') {
      return sendError(
        event,
        createError({ statusCode: 400, statusMessage: 'Invalid body. Pastikan name, price, stock ada dan benar' })
      );
    }

    const newItem: Item = {
      id: idCounter++,
      name: body.name,
      price: body.price,
      stock: body.stock,
    };

    items.push(newItem);
    return items;
  }

  // ===== DELETE =====
  if (action === 'delete') {
    const body = await readBody(event);

    if (typeof body.id !== 'number') {
      return sendError(
        event,
        createError({ statusCode: 400, statusMessage: 'Invalid body. Pastikan id ada dan number' })
      );
    }

    items = items.filter((i) => i.id !== body.id);
    return items;
  }

  // ===== EDIT =====
  if (action === 'edit') {
    const body = await readBody(event);

    if (
      typeof body.id !== 'number' ||
      !body.name ||
      typeof body.price !== 'number' ||
      typeof body.stock !== 'number'
    ) {
      return sendError(
        event,
        createError({ statusCode: 400, statusMessage: 'Invalid body. Pastikan id, name, price, stock ada dan benar' })
      );
    }

    const index = items.findIndex((i) => i.id === body.id);
    if (index === -1) {
      return sendError(
        event,
        createError({ statusCode: 404, statusMessage: 'Item not found' })
      );
    }

    items[index] = {
      id: body.id,
      name: body.name,
      price: body.price,
      stock: body.stock,
    };

    return items;
  }

  return sendError(
    event,
    createError({ statusCode: 400, statusMessage: 'Unknown action' })
  );
});
