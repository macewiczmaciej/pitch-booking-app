import express from "express";
import { getUser, getUserReservations, getUsers, deleteUser, updateUser, createUser } from "../controllers/user-controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/:id", verifyUser, getUser);

router.get("/", verifyAdmin, getUsers);

router.post("/", verifyAdmin, createUser);

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyAdmin, deleteUser);

router.get("/:id/reservations", verifyUser, getUserReservations);

export default router;