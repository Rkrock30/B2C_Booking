import User from '../models/User';

export const getUserProfile = async (req: any, res: any) => {
  const user = await User.findById(req.user.userId).select('-password');
  res.status(200).json(user);
};

export const updateUserProfile = async (req: any, res: any) => {
  const updated = await User.findByIdAndUpdate(req.user.userId, req.body, { new: true }).select('-password');
  res.status(200).json(updated);
};