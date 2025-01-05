import Pitch from "../models/Pitch.js"

export const createPitch = async (req, res, next) => {
    try {
      const newPitch = new Pitch({
        ...req.body,
        photo: req.body.photo || "https://via.placeholder.com/400x300",
      });
      const savedPitch = await newPitch.save();
      res.status(200).json(savedPitch);
    } catch (err) {
      next(err);
    }
  };

export const updatePitch = async(req,res,next)=>{
    try{
        const updatedPitch = await Pitch.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedPitch)
    }catch(err){
        next(err)
    }
}
export const deletePitch = async(req,res,next)=>{
    try{
        const deletedPitch = await Pitch.findByIdAndDelete(req.params.id, {$set: req.body})
        res.status(200).json(deletedPitch)
    }catch(err){
        next(err)
    }
}
export const getPitch = async(req,res,next)=>{
    try{
        const pitch = await Pitch.findById(req.params.id)
        res.status(200).json(pitch)
    }catch(err){
        next(err)
    }
}
export const getPitches = async (req, res, next) => {
    try {
      const pitches = await Pitch.find();
      res.status(200).json(pitches);
    } catch (err) {
      next(err);
    }
  };
  
