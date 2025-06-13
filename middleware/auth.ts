import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends NextApiRequest {
  user?: JwtPayload | string;
}

export const authMiddleware = (handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: Token missing or invalid format' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      (req as AuthenticatedRequest).user = decoded;
      return handler(req as AuthenticatedRequest, res);
    } catch (err) {
      console.error('JWT verification error:', err);
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
