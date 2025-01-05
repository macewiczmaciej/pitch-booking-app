import express from "express"
import { createPitch, updatePitch, deletePitch, getPitch, getPitches } from "../controllers/pitch-controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createPitch)
//UPDATE
router.put("/:id", verifyAdmin, updatePitch)
//DELETE
router.delete("/:id", verifyAdmin, deletePitch)
//GET
router.get("/:id", getPitch)
//GET ALL
router.get("/", getPitches)

export default router
