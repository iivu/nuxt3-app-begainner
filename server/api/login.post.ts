import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

import { getUserByName } from '../database/repositories/userRepository';

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody<User>(event);

  try {
    const user = await getUserByName(username);
    if (!user) return sendError(event, createError({ status: 404, message: 'User not found' }));
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) return sendError(event, createError({ status: 401, message: 'Invalid password' }));
    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ username: user.username }, secret, { expiresIn: '24h' });
    setCookie(event, 'token', token, { httpOnly: true, maxAge: 24 * 3600 });

    return { ok: true, data: user };
  } catch (error) {
    console.error(error);
    return sendError(event, createError('Login failed'));
  }
});
