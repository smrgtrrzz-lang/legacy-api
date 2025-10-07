import { Request, Response } from "express";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });
  try {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ message: "User already exists" });
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hash } });
    const token = generateToken({ id: user.id, email: user.email });
    res.json({ user: { id: user.id, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: String(err) });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });
    const token = generateToken({ id: user.id, email: user.email });
    res.json({ user: { id: user.id, email: user.email, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: String(err) });
  }
}
