import mongoose from 'mongoose';

const travellerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  age: Number,
  gender: String,
}, { timestamps: true });

export default mongoose.models.Traveller || mongoose.model('Traveller', travellerSchema);