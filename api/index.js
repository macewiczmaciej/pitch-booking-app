import express from "express"
import dotenv from "dotenv"
import mongoose, { mongo } from "mongoose"
import authRoute from "./routes/auth.js"
import pitchesRoute from "./routes/pitches.js"
import usersRoute from "./routes/users.js"
import cookieParser from "cookie-parser"
import reservationRoute from "./routes/reservations.js";
import cors from "cors";
import adminPitchesRoute from "./routes/pitches-admin.js";
import adminReservationsRoute from "./routes/reservations-admin.js";


const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB.")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconeccted!")
})

//middlewares

app.use(cors({
    origin: "http://localhost:3000", // Adres Twojego frontendu
    credentials: true,              // Obsługa ciasteczek (opcjonalnie)
  }));

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/pitches", pitchesRoute)
app.use("/api/users", usersRoute)
app.use("/api/reservations", reservationRoute);
app.use("/api/admin/pitches", adminPitchesRoute);
app.use("/api/admin/reservations", adminReservationsRoute);


app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message  || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(8800, ()=>{
    connect()
    console.log("Connected to backend.")
})