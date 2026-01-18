import User from "../models/User.js";

const register = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const user = await User.findOne({ email });
  if (user) return res.status(400).send({ error: "User already registered!" });
  const registeredUser = await User.create({ name, email, password, isAdmin });
  res.status(201).send({ message: "User created!", user: registeredUser });
};
const login = async (req, res) => {};

export { register, login };
