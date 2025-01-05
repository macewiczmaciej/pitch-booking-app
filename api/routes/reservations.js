import express from "express";
import { createReservation, getReservationsByPitch } from "../controllers/reservation-controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createReservation);

router.get("/:pitchId", getReservationsByPitch);

export default router;
