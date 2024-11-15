import { NextResponse } from "next/server";
import { NextApiRequest } from "next";

const usersDB = new Map<string, { password: string; userType: string }>();

export async function POST(req: NextApiRequest) {
  const { email, password, confirmPassword } = await req.json();

  if (usersDB.has(email)) {
    return NextResponse.json(
      { message: "Email is already registered." },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: "Passwords do not match." },
      { status: 400 }
    );
  }

  usersDB.set(email, { password, userType: "ADMIN" }); 

  return NextResponse.json({
    token: "mockToken",
    userType: "ADMIN", 
  });
}
