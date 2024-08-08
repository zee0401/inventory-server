import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getExpensesByCategory = async (req: Request, res: Response) => {
  try {
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany(
      {
        orderBy: {
          date: "desc",
        },
      }
    );
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
      (item) => ({
        ...item,
        amount: item.amount.toString,
      })
    );
    res.status(200).json(expenseByCategorySummary);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving expense by category summary" });
  }
};
