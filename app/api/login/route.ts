import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  const correctPassword = process.env.ADMIN_PASSWORD;

  if (password === correctPassword) {
    const res = NextResponse.json({ success: true });

    res.cookies.set("admin_auth", "true", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });

    return res;
  }

  return NextResponse.json(
    { success: false, error: "Wrong password" },
    { status: 401 }
  );
}