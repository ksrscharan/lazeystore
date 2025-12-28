import 'dotenv/config'; // Loads variables from .env immediately
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';

// Use environment variables or defaults
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again after 15 minutes.'
});

const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 20,
  message: 'Too many login attempts, please try again after 5 minutes.',
});

const allowedOrigins = ['http://localhost:5173', CLIENT_URL];

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(globalLimiter);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'], 
  })
);

const authRouter = await import('./routes/auth.js');
const productsRouter = await import('./routes/products.js');
const userRouter = await import('./routes/user.js');
const userProductRouter = await import('./routes/userProducts.js');
const orderRouter = await import('./routes/orders.js');

app.use('/auth', authLimiter, authRouter.default);
app.use('/products', productsRouter.default);
app.use('/userProducts', userProductRouter.default);
app.use('/user', userRouter.default);
app.use('/orders', orderRouter.default);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});