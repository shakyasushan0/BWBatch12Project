import jwt from "jsonwebtoken";
import User from "../models/User.js";

const checkAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).send({ error: "You are not loggedin!" });
  try {
    const { _id } = jwt.verify(token, "myjwtsecretkey");
    const user = await User.findById(_id);
    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    next();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export default checkAuth;
