import Traveller from '../models/Traveller';
import { NextApiRequest, NextApiResponse } from 'next';
import Joi from 'joi';


const travellerSchema = Joi.array().items(
  Joi.object({
    name: Joi.string().min(2).required(),
    age: Joi.number().integer().min(0).required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    passportNumber: Joi.string().optional(),
  })
);
const updateTravelSchema = Joi.object({
  name: Joi.string().min(2).required(),
  age: Joi.number().integer().min(0).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  passportNumber: Joi.string().optional(),
}); 

interface TravellerData {
  name: string; 
  age: number;
  gender: string;
}

export const addTraveller = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { error } = travellerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const travellersData = req.body.map((traveller: TravellerData) => ({
      ...traveller,
      userId: (req as any).user.userId,
    }));
    const traveller = await Traveller.insertMany(travellersData);
    return res.status(201).json({message:"Traveller added Successfully",traveller});
  } catch (err) {
    console.error('Error adding traveller:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTraveller = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { error } = updateTravelSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const updated = await Traveller.findOneAndUpdate(
      { _id: req.query.traveller_id, userId: (req as any).user.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Traveller not found' });
       res.status(200).json({message:"Traveller Detail updated Successfully",updated});
  } catch (err) {
    console.error('Error updating traveller:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteTraveller = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const deleted = await Traveller.findOneAndDelete({
      _id: req.query.traveller_id,
      userId: (req as any).user.userId,
    });

    if (!deleted) return res.status(404).json({ error: 'Traveller not found' });

     res.status(201).json({message:"Traveller Deleted Successfully"});
  } catch (err) {
    console.error('Error deleting traveller:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
