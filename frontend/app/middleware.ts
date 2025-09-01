import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/history")) {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
    try {
      jwt.verify(token, JWT_SECRET as string);
      return NextResponse.next();
    } catch {
      return NextResponse.json(
        {
          error: "Invalid token",
        },
        {
          status: 401,
        }
      );
    }
  }
  return NextResponse.next();
}
