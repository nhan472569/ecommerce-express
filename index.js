require("dotenv").config();
const express = require("express");
const pug = require("pug");
const mongoose = require("mongoose");
const md5 = require("md5");
const cookieParser = require("cookie-parser");

const productRoutes = require("./routes/product.route");
const authRoutes = require("./routes/auth.route");
const authMiddleware = require("./middlewares/auth.middleware");

const app = express();

app.use(cookieParser(process.env.SESSION_SERECT));
mongoose.connect(process.env.MONGODB_URL);

const PORT = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.redirect("/products"));
app.use("/products", authMiddleware.requireAuth, productRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => console.log("Server is listening at port " + PORT));
