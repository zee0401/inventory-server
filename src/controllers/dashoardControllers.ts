import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardMatrics = async (
  req: Request,
  res: Response
): Promise<Void> => {
  try {
    const popularProducts = await prisma.product.findMany({
      take: 15,
      orderBy: {
        stockQuantity: "desc",
      },
    });

    const salesSummary = await prisma.salesSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const expenseSummary = await prisma.expenseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const purchaseSummary = await prisma.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const expenseBYCategorySummaryRaw = await prisma.expenseSummaryRaw.findMany(
      {
        take: 5,
        orderBy: {
          date: "desc",
        },
      }
    );
    const expenseBYCategory = await expenseBYCategorySummaryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
