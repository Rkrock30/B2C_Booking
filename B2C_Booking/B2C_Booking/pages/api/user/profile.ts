import { getUserProfile, updateUserProfile } from '../../../controllers/user.controller';
import { authMiddleware } from '../../../middleware/auth';
import connectDB from '../../../config/db';

const handler = async (req: any, res: any) => {
  await connectDB();
  if (req.method === 'GET') return getUserProfile(req, res);
  if (req.method === 'PUT') return updateUserProfile(req, res);
  res.status(405).end();
};

export default authMiddleware(handler);