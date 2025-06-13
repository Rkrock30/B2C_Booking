import { addTraveller } from '../../../controllers/traveller.controller';
import { authMiddleware } from '../../../middleware/auth';
import connectDB from '../../../config/db';

const handler = async (req: any, res: any) => {
  await connectDB();
  if (req.method === 'POST') return addTraveller(req, res);
  res.status(405).end();
};

export default authMiddleware(handler);