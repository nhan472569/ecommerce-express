require('dotenv').config();
const express = require('express');
const pug = require('pug');
const mongoose = require('mongoose');
const md5 = require('md5');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJSDocs = YAML.load('./api.yaml');

const productRoutes = require('./routes/product.route');
const authRoutes = require('./routes/auth.route');
const cartRoutes = require('./routes/cart.route');
const userRoutes = require('./routes/user.route');
const authMiddleware = require('./middlewares/auth.middleware');

const apiProductRoute = require('./api/routes/product.route');
const apiAuthRoute = require('./api/routes/auth.route');
const apiCartRoute = require('./api/routes/cart.route');
const apiUserRoute = require('./api/routes/user.route');
const apiAuthorRoute = require('./api/routes/author.route');

const app = express();
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(cookieParser(process.env.SESSION_SERECT));
mongoose.connect(process.env.MONGODB_URL);

const PORT = process.env.PORT || 4000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.redirect('/products'));
app.use('/products', productRoutes);
app.use('/auth', authRoutes);
app.use('/cart', authMiddleware.requireAuth, cartRoutes);
app.use('/user', authMiddleware.requireAuth, userRoutes);

///////////////// api
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));
app.use('/api/products', apiProductRoute);
app.use('/api/auth', apiAuthRoute);
app.use('/api/cart', apiCartRoute);
app.use('/api/user', apiUserRoute);
app.use('/api/author', apiAuthorRoute);

app.listen(PORT, () => console.log('Server is listening at port ' + PORT));
