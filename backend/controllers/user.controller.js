import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const register = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const user = await User.findOne({ email });
  if (user) return res.status(400).send({ error: "User already registered!" });
  // const hasehedPword = bcrypt.hash(password, salt)
  const registeredUser = await User.create({ name, email, password, isAdmin });
  res.status(201).send({ message: "User created!", user: registeredUser });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send({ error: "User not found!" });
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).send({ error: "Incorrect password!" });
  generateToken(user._id, res);
  res.send({
    message: "User logged in!",
    user: {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
};

const logout = async (req, res) => {
  res.clearCookie("jwt");
  res.send({ message: "Logout success!" });
};

const getProfile = async (req, res) => {
  const user = req.user;
  res.send(user);
};

const updateProfile = async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);

  user.email = email || user.email;
  user.name = name || user.name;

  if (password) {
    user.password = password;
  }
  await user.save();
  res.send({ message: "Profile updated!" });
};

export { register, login, logout, getProfile, updateProfile };
