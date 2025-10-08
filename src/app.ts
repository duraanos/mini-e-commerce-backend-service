import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/orderRoutes';
import paymentRoutes from './routes/stripePaymentRoutes';
import webhookRoutes from './routes/stripeWebhookRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  '/api/webhook',
  express.raw({ type: 'application/json' }),
  webhookRoutes
);

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/payment', paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
