import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import prisma from "@/lib/prisma";


const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = registerSchema.parse(body);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    return NextResponse.json({ message: "Usuario registrado", user: { id: user.id, email: user.email } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error al registrar usuario" }, { status: 400 });
  }
}
