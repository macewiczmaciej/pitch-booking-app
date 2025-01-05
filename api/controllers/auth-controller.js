import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export const register = async (req,res,next)=>{
    
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
        })

        await newUser.save()
        res.status(200).send("User has been created.")
    }catch(err){
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid username or password" });
      }
  
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
  
      const { password, ...otherDetails } = user._doc;
  
      res.status(200).json({ token, ...otherDetails });
    } catch (err) {
      next(err);
    }
  };