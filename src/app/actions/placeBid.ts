"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

interface PlaceBidParams {
  productId: string;
  buyerId: string;
  amount: number;
}

export async function placeBid({ productId, buyerId, amount }: PlaceBidParams) {
  try {
    // Get auction ID linked to the product
    const auction = await prisma.auction.findUnique({
      where: { productId },
    });

    if (!auction || auction.status !== "ONGOING") {
      return { success: false, error: "Auction not found or not active" };
    }

    const bid = await prisma.bid.create({
      data: {
        productId,
        buyerId,
        amount,
        auctionId: auction.id,
        status: "PENDING",
      },
    });

    revalidatePath("/dashboard/buyer");

    return { success: true, bid };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to place bid",
    };
  }
}
