import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { bidId } = await req.json();

    const selectedBid = await prisma.bid.update({
      where: { id: bidId },
      data: { status: "ACCEPTED" },
    });

    await prisma.bid.updateMany({
      where: {
        auctionId: selectedBid.auctionId,
        id: { not: bidId },
      },
      data: { status: "REJECTED" },
    });

    await prisma.auction.update({
      where: { id: selectedBid.auctionId! },
      data: { status: "COMPLETED" },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to accept bid" }, { status: 500 });
  }
}
