import { getColumns } from '~/server/database/repositories/columnRepository';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = query.page ? parseInt(query.page as string) - 1 : 0;
    const size = query.size ? parseInt(query.size as string) : 8;

    const { columns, count } = await getColumns({ page, size });
    return { ok: true, data: { items: columns, count } };
  } catch (e) {
    console.log(e);
    return sendError(event, createError('Internal server error'));
  }
});
