import express from "express";
import { config } from "dotenv";
import userRoutes from "./routes/user.routes.js";

// dotenv path
config();

// express app
const app = express();

/**
 * App Uses
 */
app.use(express.json()); // for read json from request
app.use(express.urlencoded({ extended: true })); // for read request body

/**
 * App routes
 */

app.use("/user", userRoutes);

/**
 * Server Listen on specific port
 */

app.listen(process.env.PORT, () => {
    console.log("SERVER STARTED...");
});
