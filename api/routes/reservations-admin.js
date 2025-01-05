import express from "express";
import Reservation from "../models/Reservation.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", verifyAdmin, async (req, res, next) => {
  try {
    const reservations = await Reservation.find()
      .populate("pitchId", "name city address")
      .populate("userId", "username email");
    res.status(200).json(reservations);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", verifyAdmin, async (req, res, next) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("pitchId", "name city address")
      .populate("userId", "username email");
    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(200).json(updatedReservation);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", verifyAdmin, async (req, res, next) => {
    try {
      const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
      if (!deletedReservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }
      res.status(200).json({ message: "Reservation deleted successfully" });
    } catch (err) {
      next(err);
    }
  });
  

export default router;
