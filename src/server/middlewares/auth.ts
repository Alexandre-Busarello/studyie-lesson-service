import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '@app/config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log('header');
  console.log(authHeader);

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  console.log(1);

  const [, token] = authHeader.split(' ');

  console.log(2);

  try {
    console.log(3);
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    console.log(4);
    console.log(decoded);
    req.userId = decoded.userId;

    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: 'Token invalid' });
  }
};
