import express from 'express';
import productRouter from './routes/productRouter';
import userRouter from './routes/userRouter';

const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/products', productRouter);

export default app;
