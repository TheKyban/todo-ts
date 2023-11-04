import express from "express";
import { config } from "dotenv";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// dotenv path
config();

// express app
const app = express();

/**
 * App Uses
 */
app.use(express.json()); // for read json from request
app.use(express.urlencoded({ extended: true })); // for read request body
app.use(cookieParser());
app.use(
    cors({
        methods: ["POST", "GET", "PUT", "DELETE"],
        origin: ["http://localhost:5173"],
        credentials: true,
        
    })
);

/**
 * App routes
 */

app.use("/user", userRoutes);
app.use("/task", taskRoutes);

/**
 * Server Listen on specific port
 */

app.listen(process.env.PORT, () => {
    console.log(`SERVER STARTED ON ${process.env.PORT}...`);
});
