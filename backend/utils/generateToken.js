import jwt from "jsonwebtoken";

const generateToken = (_id, res) => {
  const token = jwt.sign({ _id }, "myjwtsecretkey", { expiresIn: "3d" });
  res.cookie("jwt", token, {
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
