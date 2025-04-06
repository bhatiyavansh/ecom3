"use server";

import { Role } from "@prisma/client";
import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";

interface SignUpParams {
  username: string;
  email: string;
  password: string;
  role: Role;
}

export async function signUp({ username, email, password, role }: SignUpParams) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
        role,
      },
    });

    return { success: true, user };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Signup failed: ${errorMessage}`);
  }
}
