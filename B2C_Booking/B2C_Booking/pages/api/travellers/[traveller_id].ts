import { updateTraveller, deleteTraveller } from '../../../controllers/traveller.controller';
import { authMiddleware } from '../../../middleware/auth';
import connectDB from '../../../config/db';

const handler = async (req: any, res: any) => {
  await connectDB();
  if (req.method === 'PUT') return updateTraveller(req, res);
  if (req.method === 'DELETE') return deleteTraveller(req, res);
  res.status(405).end();
};

export default authMiddleware(handler);