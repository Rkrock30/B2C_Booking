import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  travellerIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Traveller', required: true }],
  destination: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  start_travel_date:{ type: Date, required: true },
  last_travel_date: { type: Date, required: true },
  highlights: { type: [String], default: [] },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
