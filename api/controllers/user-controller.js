import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Reservation from "../models/Reservation.js";

export const createUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName || "",
      lastName: req.body.lastName || "",
      isAdmin: req.body.isAdmin || false,
    });

    const savedUser = await newUser.save();
    const { password, ...otherDetails } = savedUser._doc; 
    res.status(201).json(otherDetails);
  } catch (err) {
    next(err);
  }
};


export const updateUser = async (req, res, next) => {
  try {
    const { password, ...otherData } = req.body;

    if (password) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      otherData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: otherData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...otherDetails } = user._doc; 
    res.status(200).json(otherDetails);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({ userId: req.params.id }).populate("pitchId");
    if (!reservations.length) {
      return res.status(200).json({ message: "No reservations found" });
    }
    res.status(200).json(reservations);
  } catch (err) {
    next(err);
  }
};
