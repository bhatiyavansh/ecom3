"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcryptjs";
import {Role} from "@prisma/client";
interface SignInResult {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  error?: string;
  role?: Role;
}

export default async function signin(email: string, password: string): Promise<SignInResult> {
  let user;
  try {
     user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return { success: false, error: "Invalid credentials" };
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return { success: false, error: "Invalid credentials" };
    }

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      role: user.role,
    };
  } catch (err: any) {
    return { success: false, error: "Something went wrong",role: user?.role };
  }
}
