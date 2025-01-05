import mongoose from "mongoose";

const PitchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
    photo: {
    type: String,
    default: "https://via.placeholder.com/400x300", // Placeholder image
  },
});

export default mongoose.model("Pitch", PitchSchema);
