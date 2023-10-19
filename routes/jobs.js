import express from "express";
import sequelize from "../config/db.js";

const jobsRouter = express.Router();

// GET /jobs
jobsRouter.get('/', async (req, res) => {
  try {
    const jobs = await sequelize.query("SELECT * FROM job");
    res.status(200).json(jobs[0]); // Use jobs[0] to access the result rows.
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

// POST /jobs/add
jobsRouter.post("/add", async (req, res) => {
  try {
    const [newJob] = await sequelize.query(
      'INSERT INTO job (title) VALUES (:title) RETURNING *',
      {
        replacements: { title: req.body.title },
        type: sequelize.QueryTypes.INSERT
      }
    );

    res.status(201).json({ message: 'Job added successfully', newJob });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while adding a job." });
  }
});



export default jobsRouter;
