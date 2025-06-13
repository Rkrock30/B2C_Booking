// models/User.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  refreshToken: String,   
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
