import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "../_helpers/data-source";
import userRoutes from "../dist/users/user.controller";
import { errorHandler } from "../dist/error-handler";

const app = express(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.use("/users", userRoutes);
    app.use(errorHandler); // Keep this at the end

    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  })
  .catch((error) => console.error("Database connection failed", error));
