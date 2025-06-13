import Order from '../models/Order';
import Traveller from '../models/Traveller';
import { generateBookingSummary } from '../services/openai.service';
import { NextApiRequest, NextApiResponse } from 'next';

export const getBookings = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { status } = req.query;
    const userId = (req as any).user?.userId;

    if (!['upcoming', 'completed'].includes(String(status))) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const currentDate = new Date();

    let query = { userId };

    if (status === 'upcoming') {
      Object.assign(query, { last_travel_date: { $gte: currentDate } });
    } else if (status === 'completed') {
      Object.assign(query, { last_travel_date: { $lt: currentDate } });
    }

    const bookings = await Order.find(query);
    res.status(200).json({message: bookings.length>0?'Bookings fetched successfully':'No Data Found', Data: bookings});
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const bookingSummary = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const booking = await Order.findById(id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const summary = await generateBookingSummary(booking);
    res.status(200).json({ summary });
  } catch (error) {
    console.error('Error generating booking summary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const createOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = (req as any).user?.userId;

    const {
      travellers,
      destination,
      from,
      to,
      start_travel_date,
      last_travel_date,
      highlights,
    } = req.body;

    if (!Array.isArray(travellers) || travellers.length === 0) {
      return res.status(400).json({ error: 'At least one traveller is required.' });
    }

    const createdTravellers = await Traveller.insertMany(
      travellers.map(t => ({ ...t, userId }))
    );

    const travellerIds = createdTravellers.map(t => t._id);
    const order = await Order.create({
      userId,
      travellerIds,
      destination,
      from,
      to,
      start_travel_date,
      last_travel_date,
      highlights,
    });

    res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
