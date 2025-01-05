import express from "express";
import Pitch from "../models/Pitch.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, async (req, res, next) => {
  try {
    const newPitch = new Pitch(req.body);
    const savedPitch = await newPitch.save();
    res.status(201).json(savedPitch);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", verifyAdmin, async (req, res, next) => {
  try {
    const updatedPitch = await Pitch.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedPitch) {
      return res.status(404).json({ message: "Pitch not found" });
    }
    res.status(200).json(updatedPitch);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", verifyAdmin, async (req, res, next) => {
  try {
    const deletedPitch = await Pitch.findByIdAndDelete(req.params.id);
    if (!deletedPitch) {
      return res.status(404).json({ message: "Pitch not found" });
    }
    res.status(200).json({ message: "Pitch deleted successfully!" });
  } catch (err) {
    next(err);
  }
});

router.get("/", verifyAdmin, async (req, res, next) => {
  try {
    const pitches = await Pitch.find();
    res.status(200).json(pitches);
  } catch (err) {
    next(err);
  }
});

export default router;
