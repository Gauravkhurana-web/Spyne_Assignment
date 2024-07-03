const mongoose = require("mongoose");
const CONNECTION_STRING =
  "mongodb+srv://admin:admin@cluster0.onlcjxb.mongodb.net/spyne?retryWrites=true&w=majority&appName=Cluster0";

const connectDb = async function () {
  try {
    const connect = await mongoose.connect(CONNECTION_STRING);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
