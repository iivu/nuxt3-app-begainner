import * as jwt from 'jsonwebtoken';
import { getUserByName } from '../database/repositories/userRepository';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token');
  if (!token) return { ok: false };

  let tokenInfo: jwt.JwtPayload;
  try {
    tokenInfo = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    const currentTime = Date.now() / 1000;
    if (tokenInfo.exp! < currentTime) return sendError(event, createError({ status: 401, message: 'Token expired' }));
  } catch (error) {
    return sendError(event, createError({ status: 401, message: 'Invalid token' }));
  }
  try {
    const user = await getUserByName(tokenInfo.username);
    if (!user) return sendError(event, createError({ status: 404, message: 'User not found' }));
    return { ok: true, data: user };
  } catch (error) {
    console.error(error);
    return sendError(event, createError('Get user info failed'));
  }
});
