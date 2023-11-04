import { Request, Response } from "express";
import { CustomRequest } from "../middleware/authMiddleware.js";
import { jwtCustomPayload } from "./user.controllers.js";
import prisma from "../models/index.js";

class TaskControllers {
    async createTask(req: Request, res: Response) {
        try {
            const { token } = <CustomRequest>req;
            const { id } = <jwtCustomPayload>token;
            if (!id) {
                return res.json({
                    success: false,
                    message: "unauthorised",
                });
            }

            const { title, description } = req.body;
            if (!title || !description) {
                return res.json({
                    success: false,
                    message: "please enter all fields",
                });
            }

            const task = await prisma.task.create({
                data: {
                    title,
                    description,
                    userId: id,
                },
            });

            return res.json({
                success: true,
                message: "Task created successfully",
                task,
            });
        } catch (error) {
            console.log(error);
            return res.json({
                success: false,
                message: "Some error",
            });
        }
    }

    async getTasks(req: Request, res: Response) {
        try {
            const { token } = <CustomRequest>req;
            const { id } = <jwtCustomPayload>token;
            if (!id) {
                return res.json({
                    success: false,
                    message: "unauthorised",
                });
            }

            const tasks = await prisma.task.findMany({
                where: { userId: id },
            });

            return res.json({
                success: true,
                tasks,
            });
        } catch (error) {
            console.log(error);
            return res.json({
                success: false,
                message: "Some error",
            });
        }
    }
    async updateTask(req: Request, res: Response) {
        try {
            const { id, title, description } = req.body;

            /**
             * Check id or another fields are available
             */

            if (!id || !title || !description) {
                return res.json({
                    success: false,
                    message: "provide all details",
                });
            }

            /**
             * Update The Task
             */

            const task = await prisma.task.update({
                where: { id },
                data: {
                    title,
                    description,
                },
            });

            /**
             * return updated task
             */

            return res.json({
                success: true,
                message: "Task updated successfully",
                task,
            });
        } catch (error: any) {
            /**
             * if invalid id given
             */

            if (
                error?.meta?.cause === "Record to update not found." ||
                error?.meta?.message.split(",")[0] ===
                    "Malformed ObjectID: provided hex string representation must be exactly 12 bytes"
            ) {
                return res.json({
                    success: false,
                    message: "invalid task id",
                });
            }
            return res.json({
                success: false,
                message: "Some error",
            });
        }
    }
    async deleteTask(req: Request, res: Response) {
        try {
            const { id } = req.body;

            /**
             * Check id or another fields are available
             */

            if (!id) {
                return res.json({
                    success: false,
                    message: "provide all details",
                });
            }

            /**
             * delete The Task
             */

            const task = await prisma.task.delete({
                where: { id },
            });

            /**
             * return updated task
             */

            return res.json({
                success: true,
                message: "Task deleted successfully",
                task,
            });
        } catch (error: any) {
            /**
             * if invalid id given
             */

            if (
                error?.meta?.cause === "Record to update not found." ||
                error?.meta?.message.split(",")[0] ===
                    "Malformed ObjectID: provided hex string representation must be exactly 12 bytes"
            ) {
                return res.json({
                    success: false,
                    message: "invalid task id",
                });
            }
            return res.json({
                success: false,
                message: "Some error",
            });
        }
    }
}

export default new TaskControllers();
