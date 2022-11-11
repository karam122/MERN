import SignUpMessage from "../models/signUp.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose'
// import auth from '../middleware/auth.js'

export const UserProfile = async (req, res) => {
    
  const { id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json('No Post Ith That id!')
  }
  try {
    const existingUser = await SignUpMessage.findById({_id: id})

    if (existingUser) {
      res.status(200).json({ user: existingUser });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
