import express from "express"
import authRoute from "./routes/auth.route";
import './config/db.config'
import './models/associtaions'
import {errorMiddleware} from "./middlewares/error.middleware";
import cors from 'cors'
import cookieParser from "cookie-parser";

const PORT= process.env.PORT || 3000
const app=express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(authRoute)
app.use(errorMiddleware)

app.listen(PORT,()=>{
    console.log("Connected to DB and running on port: " + PORT)
}).on("error", (error) => {
    throw new Error(error.message)
})