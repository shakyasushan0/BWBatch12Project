import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";

import connectDB from "./db/connectDB.js";

async function loadData() {
  await connectDB();
  await Product.deleteMany();
  await User.deleteMany();
  await Order.deleteMany();
  const newUsers = await User.insertMany(users);
  const adminId = newUsers[0]._id;
  const newProducts = products.map((p) => {
    return { user: adminId, ...p };
  });
  await Product.insertMany(newProducts);
  console.log("Data Loaded");
  process.exit();
}

async function destroyData() {
  await connectDB();
  await Product.deleteMany();
  await User.deleteMany();
  await Order.deleteMany();
  console.log("Data cleared!");
  process.exit();
}

const mode = process.argv[2] || "";
if (mode == "-D") {
  destroyData();
} else {
  loadData();
}
