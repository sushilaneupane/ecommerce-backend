import categoryRoutes from '../modules/categories/category.route.js';
import productRoutes from '../modules/products/product.route.js';
import userRoutes from '../modules/users/user.route.js';


export default (app) => {
  app.use('/api/categories', categoryRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/users', userRoutes);
};
