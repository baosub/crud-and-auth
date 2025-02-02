import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const user = JSON.parse(req.headers.get("user")!);
  return NextResponse.json({ message: "Usuario autenticado", user });
}
