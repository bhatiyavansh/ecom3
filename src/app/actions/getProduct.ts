"use server";

import { prisma } from "@/utils/prisma";

export async function getActiveProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        auction: {
          status: "ONGOING",
        },
      },
      include: {
        seller: {
          select: { name: true, email: true },
        },
        auction: true,
        bids: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch active products");
  }
}