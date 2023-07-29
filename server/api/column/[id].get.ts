import { getColumnById, getColumns } from '~/server/database/repositories/columnRepository';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id ? parseInt(event.context.params.id) : null;
  if (!id) return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }));
  try {
    const column = await getColumnById(id);
    if (!column) return sendError(event, createError({ statusCode: 404, statusMessage: 'Column not found' }));
    const { columns: recommend } = await getColumns({ page: 1, size: 2 });

    return { ok: true, data: { item: column, recommend } };
  } catch (e) {
    return sendError(event, createError('Internal server error'));
  }
});
