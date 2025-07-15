import User from "../models/User.js";
import bcrypt from "bcryptjs";
export const createUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: "User already exists" });
  const safe = await bcrypt.hash(password, 10);
  const user = new User({ email, password: safe });
  await user.save();
  res
    .status(201)
    .json({ message: "user created succesfully", userId: user._id });
};
export const authorizeUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "user not  found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "invalid  password" });
  res.status(200).json({ message: "login successful", userId: user._id });
};
