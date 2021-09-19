const express = require("express");
const pug = require("pug");
const productRoutes = require("./routes/product.route");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use("/product", productRoutes);

app.listen(PORT, () => console.log("Server is listening at port " + PORT));
