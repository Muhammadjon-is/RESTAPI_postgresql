import { Sequelize } from 'sequelize';

// Load environment variables using a library like 'dotenv' if necessary
import * as dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,      // Database name
  process.env.DB_USERNAME,  // Database username
  process.env.DB_PASSWORD,  // Database password
  {
    host: process.env.DB_HOST, // Database host
    port: process.env.DB_PORT, // Database port
    dialect: 'postgres',      // Dialect (PostgreSQL in this case)
    dialectOptions: {
      // Additional options if needed
    }
  }
);

export default sequelize;
