require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const DbConnection = require("./config/mongoos")

// Routes
const userRouter = require("./routes/user")
const productRouter = require("./routes/product")
const categoryRouter = require("./routes/category")
const cartRouter = require("./routes/cart")
const { swaggerDocs } = require("./swagger")

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({origin: "*"}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

DbConnection()

app.get("/", (req, res) => {
  res.json("Welcome to FreshCart Api v1.")
})

app.use("/api/user", userRouter)
app.use("/api/products", productRouter)
app.use("/api/categories", categoryRouter)
app.use("/api/cart", cartRouter)


app.listen(PORT, () => {
  swaggerDocs(app, PORT)
  console.log(`App is running on ${PORT}`);
});
