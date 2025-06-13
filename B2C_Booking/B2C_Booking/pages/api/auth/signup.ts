import { signupController } from '../../../controllers/auth.controller';
import connectDB from '../../../config/db';

export default async function handler(req: any, res: any) {
  await connectDB();
  if (req.method !== 'POST') return res.status(405).end();
  return signupController(req, res);
}