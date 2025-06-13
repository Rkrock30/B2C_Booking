// services/jwt.service.ts
import jwt from 'jsonwebtoken';

export const generateToken = (payload: object, expiresIn: string) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn });
};
