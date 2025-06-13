import { NextApiResponse } from 'next';

export const errorHandler = (res: NextApiResponse, error: any) => {
  console.error('Error:', error);
  res.status(500).json({ error: 'Internal server error' });
};