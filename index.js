require("dotenv").config();
const express = require("express");
const pug = require("pug");
const mongoose = require("mongoose");
const md5 = require("md5");
const cookieParser = require("cookie-parser");
var cors = require("cors");
app.use(cors());

const productRoutes = require("./routes/product.route");
const authRoutes = require("./routes/auth.route");
const cartRoutes = require("./routes/cart.route");
const authMiddleware = require("./middlewares/auth.middleware");
const apiProductRoute = require("./api/routes/product.route");

const app = express();

app.use(cookieParser(process.env.SESSION_SERECT));
mongoose.connect(process.env.MONGODB_URL);

const PORT = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.redirect("/products"));
app.use("/api/products", apiProductRoute);
app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/cart", authMiddleware.requireAuth, cartRoutes);

app.listen(PORT, () => console.log("Server is listening at port " + PORT));
