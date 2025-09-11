import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
