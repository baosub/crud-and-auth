import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const userHeader = req.headers.get("x-user");

  if (!userHeader) {
    return NextResponse.json({ message: "No autorizado", user: null }, { status: 401 });
  }

  const user = JSON.parse(userHeader);

  return NextResponse.json({
    message: "Usuario autenticado",
    user,
  });
}
