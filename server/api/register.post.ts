import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { createUser, getUserByName } from '../database/repositories/userRepository';

import type { User } from '@prisma/client';

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody<User>(event);
    const user = await getUserByName(data.username);
    if (user) {
      return sendError(event, createError({ status: 400, statusMessage: 'User already exists' }));
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);
    data.password = hash;
    const result = await createUser(data);
    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ username: result.username }, secret, { expiresIn: '24h' });
    setCookie(event, 'token', token, { maxAge: 24 * 3600 });
    
    return { ok: true, data: result };
  } catch (error) {
    console.error(error);
    return sendError(event, createError('Internal Server Error'));
  }
});
