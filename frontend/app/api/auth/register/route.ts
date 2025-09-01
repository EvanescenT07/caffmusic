import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { email, name, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }
  const userExist = await prisma.user.findUnique({
    where: { email },
  });
  if (userExist) {
    return NextResponse.json(
      { error: "User Email already exists" },
      { status: 400 }
    );
  }
  const hash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      email,
      name,
      password: hash,
    },
  });
  return NextResponse.json({
    success: true,
    message: "User created successfully",
  });
}
