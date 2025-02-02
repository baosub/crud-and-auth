import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
  if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const { payload } = await jwtVerify(token, SECRET);
    req.headers.set("user", JSON.stringify(payload));
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: "Token inválido" }, { status: 403 });
  }
}

export const config = {
  matcher: ["/api/protected/:path*"], // Protege cualquier ruta dentro de /api/protected
};
