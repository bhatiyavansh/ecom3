"use server";

import { prisma } from "@/utils/prisma";

export async function acceptBid(bidId: string) {
  try {
    // Accept selected bid
    const bid = await prisma.bid.update({
      where: { id: bidId },
      data: { status: "ACCEPTED" },
    });

    // Reject all other bids for the same auction
    await prisma.bid.updateMany({
      where: {
        auctionId: bid.auctionId,
        id: { not: bidId },
      },
      data: {
        status: "REJECTED",
      },
    });

    // Mark auction as completed
    await prisma.auction.update({
      where: { id: bid.auctionId! },
      data: { status: "COMPLETED" },
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to accept bid" };
  }
}
