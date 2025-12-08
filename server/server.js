import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import rateLimit from 'express-rate-limit';

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
  message: 'Too many login attempts from this IP, please try again after 5 minutes.',
});

const authRouter = await import('./routes/auth.js');
const productsRouter = await import('./routes/products.js');
const app = express();
const PORT = 3000;
app.use(cookieParser());
app.use(express.json());
app.use(globalLimiter);
app.use(
  cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    origin: 'http://localhost:5173',
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/auth', authLimiter, authRouter.default);

app.use('/products', productsRouter.default);
