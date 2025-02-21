import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import { app } from './app.js'  

dotenv.config({ path: './env' })



connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`server is running at port ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log("mongoDB connection faied: ", error);

    })
2




























































 




/*
import express from 'express'
const app = express()
import mongoose from 'mongoose'
import { DB_NAME } from "./constants"

    (async () => {
        try {
            await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
            app.on('error', (error) => {
                console.log("ERROR: ", error);
                throw error
            })
            app.listen(process.env.PORT, () => {
                console.log(`App is listing on port: ${process.env, PORT}`);

            })
        } catch (error) {
            console.error("error:", error)
        }
    })()

    */