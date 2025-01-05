import Reservation from "../models/Reservation.js";
import mongoose from "mongoose";
import User from "../models/User.js";

export const createReservation = async (req, res, next) => {
    try {
      const { pitchId, userId, date, hour } = req.body;
      console.log("Received data:", { pitchId, userId, date, hour });
  
      if (!mongoose.Types.ObjectId.isValid(pitchId)) {
        console.error("Invalid pitchId:", pitchId);
        return res.status(400).json({ message: "Invalid pitchId format" });
      }
  
      const existingReservation = await Reservation.findOne({
        pitchId,
        date,
        hour,
      });
  
      if (existingReservation) {
        console.error("Slot already booked:", { pitchId, date, hour });
        return res.status(400).json({ message: "This time slot is already booked." });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const newReservation = new Reservation({
        pitchId,
        userId,
        date,
        hour,
      });
      const savedReservation = await newReservation.save();
  
      console.log("Reservation created:", savedReservation);
  
      res.status(201).json(savedReservation);
    } catch (err) {
      console.error("Error creating reservation:", err);
      next(err);
    }
  };

export const getReservationsByPitch = async (req, res, next) => {
  try {
    const { pitchId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pitchId)) {
      return res.status(400).json({ message: "Invalid pitchId format" });
    }

    const reservations = await Reservation.find({ pitchId });

    res.status(200).json(reservations);
  } catch (err) {
    console.error("Error fetching reservations:", err);
    next(err);
  }
};
