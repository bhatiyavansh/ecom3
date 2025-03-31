import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../supabaseClient.js";
import dotenv from "dotenv";

dotenv.config();

// User Registration
export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Register the user using Supabase's auth API
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Return a success response
    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong, please try again later' });
  }
};

// User Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.from("User").select("*").eq("email", email).single();

  if (error || !data) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, data.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: data.id, role: data.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token, user: { id: data.id, name: data.name, email: data.email, role: data.role } });
};
