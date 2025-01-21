require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const DbConnection = require("./config/mongoos")
const swaggerUi = require("swagger-ui-express")

// Routes
const userRouter = require("./routes/user")
const productRouter = require("./routes/product")
const categoryRouter = require("./routes/category")
const cartRouter = require("./routes/cart")
const { generateSwaggerSpec } = require("./config/swaggerConfig")

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: "*" }))
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


const swaggerSpec = generateSwaggerSpec(app);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }))

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
