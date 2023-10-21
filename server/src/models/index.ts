import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const { task: Task, user: User } = prisma;
export default prisma;
