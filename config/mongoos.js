require("dotenv").config();

const mongoose = require("mongoose");
// const mongoURI = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@testcluster.incqu.mongodb.net/testApp?retryWrites=true&`
const mongoURI = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.rv70ch9.mongodb.net/online_store?retryWrites=true&`


const DbConnection = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongodb database");
  } catch (error) {
    console.log("Failed to connect to Mongodb:", error.message);
  }
};
module.exports = DbConnection;