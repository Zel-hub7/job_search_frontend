import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === "admin@example.com" && password === "password") {
    return NextResponse.json({ token: "mockToken", userType: "ADMIN" });
  } else {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
