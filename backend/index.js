import app from "./app.js";
import connectDB from "./db/connectDB.js";

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server is up and running");
  });
});
