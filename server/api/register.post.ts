import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { createUser } from '../database/repositories/userRepository';

import type { User } from '@prisma/client';

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody<User>(event);

    const user = await createUser(data);
    if (!user) {
      return sendError(event, createError({ status: 400, message: 'User already exists' }));
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    data.password = hash;
    const result = await createUser(data);
    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ username: result.username }, secret, { expiresIn: '24h' });
    setCookie(event, 'token', token, { httpOnly: true, maxAge: 24 * 3600 });
    
    return { ok: true, data: result };
  } catch (error) {
    console.error(error);
    return sendError(event, createError('Internal Server Error'));
  }
});
