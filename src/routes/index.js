import categoryRoutes from '../modules/categories/category.route.js';
import productRoutes from '../modules/products/product.route.js';
import userRoutes from '../modules/users/user.route.js';
import addressRoutes from '../modules/address/address.route.js';
import cartRoutes from '../modules/carts/cart.route.js';
import wishlistRoute from '../modules/wishlist/wishlist.route.js';
import OrdersRoute from '../modules/orders/orders.route.js';

export default (app) => {
  app.use('/api/categories', categoryRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/users/login', userRoutes);
  app.use('/api/address', addressRoutes);
  app.use('/api/carts', cartRoutes);
  app.use('/api/wishlist', wishlistRoute);
  app.use('/api/orders', OrdersRoute)
};
