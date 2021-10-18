require("dotenv").config();
const express = require("express");
const pug = require("pug");
const mongoose = require("mongoose");
const md5 = require("md5");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJSDocs = YAML.load("./api.yaml");

const productRoutes = require("./routes/product.route");
const authRoutes = require("./routes/auth.route");
const cartRoutes = require("./routes/cart.route");
const authMiddleware = require("./middlewares/auth.middleware");

const apiProductRoute = require("./api/routes/product.route");
const apiAuthRoute = require("./api/routes/auth.route");
const apiCartRoute = require("./api/routes/cart.route");

const app = express();
app.use(cors());

app.use(cookieParser(process.env.SESSION_SERECT));
mongoose.connect(process.env.MONGODB_URL);

const PORT = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.redirect("/products"));
app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/cart", authMiddleware.requireAuth, cartRoutes);

///////////////// api
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));
app.use("/api/products", apiProductRoute);
app.use("/api/auth", apiAuthRoute);
app.use("/api/cart", apiCartRoute);
app.listen(PORT, () => console.log("Server is listening at port " + PORT));
