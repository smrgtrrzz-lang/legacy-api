import { Request, Response } from "express";
import prisma from "../prisma/client";

export async function getPosts(req: Request, res: Response) {
  const posts = await prisma.post.findMany({ include: { author: { select: { id: true, email: true } } }, orderBy: { createdAt: "desc" } });
  res.json(posts);
}

export async function createPost(req: Request, res: Response) {
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ message: "Title required" });
  const post = await prisma.post.create({ data: { title, content: content || "", authorId: req.user.id } });
  res.status(201).json(post);
}

export async function updatePost(req: Request, res: Response) {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return res.status(404).json({ message: "Post not found" });
  if (post.authorId !== req.user.id) return res.status(403).json({ message: "Forbidden" });
  const updated = await prisma.post.update({ where: { id }, data: { title: title || post.title, content: content ?? post.content } });
  res.json(updated);
}

export async function deletePost(req: Request, res: Response) {
  const { id } = req.params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return res.status(404).json({ message: "Post not found" });
  if (post.authorId !== req.user.id) return res.status(403).json({ message: "Forbidden" });
  await prisma.post.delete({ where: { id } });
  res.json({ message: "Deleted" });
}
