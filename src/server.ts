import express from "express"

import DB from './config/db.config'

await DB.getDB().sync({force: true})
const PORT= process.env.PORT || 3000
const app=express()


app.use(express.json())

app.listen(PORT,()=>{
    console.log("Connected to DB and running on port: " + PORT)
}).on("error", (error) => {
    throw new Error(error.message)
})