import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

const authRouter = await import('./routes/auth.js');
const productsRouter = await import('./routes/products.js');
const app = express();
const PORT = 3000;
app.use(cookieParser());
app.use(express.json());
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

app.use('/auth', authRouter.default);

app.use('/products', productsRouter.default);
