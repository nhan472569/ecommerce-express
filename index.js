require("dotenv").config();
const express = require("express");
const pug = require("pug");
const mongoose = require("mongoose");

const productRoutes = require("./routes/product.route");

const app = express();
mongoose.connect(process.env.MONGODB_URL);

const PORT = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.redirect("/products"));
app.use("/products", productRoutes);

app.listen(PORT, () => console.log("Server is listening at port " + PORT));
