const express = require("express");
const bodyParser = require("body-parser");
const connectDb = require("./config/dbConnection");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const discussionRoutes = require("./routes/discussionRoutes");
const followRoutes = require("./routes/followRoutes");

const app = express();
connectDb();

app.use(bodyParser.json());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/comments", commentRoutes);
app.use("/discussions", discussionRoutes);
app.use("/follows", followRoutes);

app.get("/", (req, res) => {
  //console.log("hello world");
  res.status(200).json({ message: "Success" });
});

app.listen(3004, () => {
  console.log("App running on port 3004");
});
