import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, buyerId, amount } = body;

    if (!productId || !buyerId || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const auction = await prisma.auction.findUnique({
      where: { productId },
    });

    if (!auction || auction.status !== "ONGOING") {
      return NextResponse.json({ error: "Invalid or inactive auction" }, { status: 400 });
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

    return NextResponse.json(bid);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to place bid" }, { status: 500 });
  }
}