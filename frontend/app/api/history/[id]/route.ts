import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    fileName,
    genre,
    predictionId,
    confidence,
    chunkPredictions,
    finalPrediction,
    timestamp,
  } = body;

  const prediction = await prisma.prediction.create({
    data: {
      userId: session.user.id,
      fileName,
      genre,
      predictionId,
      confidence,
      chunkPredictions,
      finalPrediction,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    },
  });

  return NextResponse.json(
    {
      success: true,
      message: "Prediction saved successfully",
      prediction,
    },
    { status: 200 }
  );
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const id = (await params).id;
  if (!id) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const history = await prisma.prediction.findUnique({
    where: { id: id },
  });

  if (!history || history.userId !== session.user.id) {
    return NextResponse.json({ error: "History not found" }, { status: 404 });
  }

  await prisma.prediction.delete({
    where: { id: id },
  });
  return NextResponse.json(
    {
      success: true,
      message: "History deleted successfully",
    },
    { status: 200 }
  );
}
