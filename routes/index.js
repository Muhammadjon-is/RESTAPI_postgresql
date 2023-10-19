import jobsRouter from "./jobs.js";
import employeRouter from "./empoleys.js";
import express from "express";


const indexRouter = express.Router();

 
indexRouter.use('/jobs', jobsRouter),
indexRouter.use('/employers', employeRouter)
// indexRouter.use("/add", jobsRouter)

export default indexRouter




