import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET() {
  // 1. Cek NextAuth session
  const session = await getServerSession(authOptions);
  let userId: string | null = null;

  if (session?.user?.id) {
    userId = session.user.id;
  } else {
    // 2. Cek custom JWT
    const token = (await cookies()).get("token")?.value;
    if (token) {
      try {
        if (!JWT_SECRET) {
          throw new Error("JWT_SECRET is not defined");
        }
        const payload = jwt.verify(token, JWT_SECRET) as unknown as {
          id: string;
        };
        userId = payload.id;
      } catch {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }
    }
  }

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 3. Query history berdasarkan userId
  const history = await prisma.prediction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json(history);
}
