"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

interface PostProductParams {
  name: string;
  description?: string;
  quantity: number;
  price: number;
  startTime: string;
  endTime: string;
  sellerId: string;
}

export async function postProduct({
  name,
  description,
  quantity,
  price,
  startTime,
  endTime,
  sellerId,
}: PostProductParams) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: sellerId },
    });

    if (!user || user.role !== "SELLER") {
      return { success: false, error: "Invalid seller" };
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        quantity,
        price,
        sellerId,
        auction: {
          create: {
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            status: "ONGOING",
          },
        },
      },
    });

    revalidatePath("/dashboard/seller");
    return { success: true, product };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error while posting product",
    };
  }
}
