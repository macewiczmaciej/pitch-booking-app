import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  pitchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pitch", 
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  date: {
    type: String, 
    required: true,
  },
  hour: {
    type: String, 
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Reservation", ReservationSchema);
