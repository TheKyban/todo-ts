import express, { Router } from "express";
import taskControllers from "../controllers/task.controllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router: Router = express.Router();

router.get("/all", authMiddleware, taskControllers.getTasks);
router.post("/create", authMiddleware, taskControllers.createTask);
router.delete("/delete", authMiddleware, taskControllers.deleteTask);
router.put("/update", authMiddleware, taskControllers.updateTask);

export default router;
