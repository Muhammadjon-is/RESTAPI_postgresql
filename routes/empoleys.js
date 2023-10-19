import express from "express";
import sequelize from "../config/db.js";

const employeRouter = express.Router();

employeRouter.get("/", async (req, res) => {
  try {
    const employers = await sequelize.query(`SELECT * FROM employer`);
    res.status(200).json(employers[0]);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching employers." });
  }
});

// Get EMPLOYER BY ID
employeRouter.get("/:id", async (req, res) => {
  try {
    const employerId = req.params.id;

    const employer = await sequelize.query(
      `
            SELECT * 
            FROM employer
            LEFT JOIN job ON job.id = employer.job_id
            WHERE employer.id = :id
        `,
      {
        replacements: { id: employerId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (employer.length === 0) {
      return res.status(404).json({ error: "Employer not found." });
    }

    res.status(200).json(employer[0]);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while fetching an employer.",
        details: error.message,
      });
  }
});

// Add new Employer
employeRouter.post("/add", async (req, res) => {
  try {
    const { name, salary, degree, job_id } = req.body;
    const newEmployer = await sequelize.query(
      `INSERT INTO employer (name, degree, salary, job_id) VALUES (:name, :degree, :salary, :job_id) RETURNING *`,
      {
        replacements: { name, degree, salary, job_id },
        type: sequelize.QueryTypes.INSERT,
      }
    );
    res.status(201).json(newEmployer[0]);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding an employer." });
  }
});

// Edit/Update Employer
employeRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary, degree, job_id } = req.body;

    const oldEmployer = await sequelize.query(
      "SELECT * FROM employer WHERE id = :id",
      {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (oldEmployer.length === 0) {
      return res.status(404).json({ error: "Employer not found." });
    }

    const updatedEmployer = await sequelize.query(
      "UPDATE employer SET name = :name, degree = :degree, salary = :salary, job_id = :job_id WHERE id = :id RETURNING *",
      {
        replacements: {
          name: name || oldEmployer[0].name,
          degree: degree || oldEmployer[0].degree,
          salary: salary || oldEmployer[0].salary,
          job_id: job_id || oldEmployer[0].job_id,
          id,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    res.status(200).json(updatedEmployer[0]);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while updating an employer.",
        details: error.message,
      });
  }
});

// Delete Empoyer

employeRouter.delete("/:id", async (req, res) => {
  try {
    await sequelize.query("DELETE FROM employer WHERE id = :id", {
      replacements: { id: req.params.id },
      type: sequelize.QueryTypes.DELETE,
    });

    res.status(204).end(); // Return a 204 No Content status upon successful deletion
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while deleting an employer.",
        details: error.message,
      });
  }
});

export default employeRouter;
