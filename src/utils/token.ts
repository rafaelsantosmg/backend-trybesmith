import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY: string = process.env.JWT_SECRET || 'NewSummerJobToTrybe17';

export const createToken = (user: object | boolean) => {
  const token = jwt.sign({ data: user }, SECRET_KEY, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });

  return token;
};

export const decoderToken = (token: string) => {
  try {
    const decoder = jwt.verify(token, SECRET_KEY);
    return decoder;
  } catch (error) {
    return false;
  }
};