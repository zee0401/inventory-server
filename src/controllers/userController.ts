import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.users.findMany();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving users",
    });
  }
};
