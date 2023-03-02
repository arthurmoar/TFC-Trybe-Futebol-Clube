import * as JWT from 'jsonwebtoken';

require('dotenv/config');

const secret: JWT.Secret = process.env.JWT_SECRET as string;

const encodedToken = (email: string) => {
  const token = JWT.sign({ email }, secret, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

export default { encodedToken };
