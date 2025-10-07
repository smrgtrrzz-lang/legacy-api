import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET || "dev-secret";
export function generateToken(payload: object, expiresIn = "7d") {
  return jwt.sign(payload, secret, { expiresIn });
}
