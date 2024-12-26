import CartService from './cart.service.js';


class CartController {
    constructor() {
        this.cartService = new CartService();
    }

    getAllCarts = async (req, res) => {
        try {
            const carts = await this.cartService.getAllCartss();
            res.status(200).json(carts);

        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    };
    getCartById = async (req, res) => {
        const { id } = req.params;
        try {
            const cart = await this.cartService.getCartById(id);
            res.status(200).json(cart);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    createCart = async (req, res) => {
        try {
            const {quantity, userId, productId} = req.body;
            const cart = await this.cartService.createCart(quantity, userId, productId);
            res.status(201).json(cart);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    updateCart = async (req, res) => {
        const { id } = req.params;
        const { quantity, userId, productId } = req.body;
        try {
            const updatedCart = await this.cartService.updateCart(id, quantity, userId, productId);
            if (updatedCart) {
                res.status(200).json(updatedCart);
            } else {
                res.status(404).json({ message: 'Cart not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating cart', error: error.message });
        }
    };

    deleteCart = async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await this.cartService.deleteCart(id);
            if (deleted) {
                res.status(200).json({ message: 'Cart deleted successfully' });
            } else {
                res.status(404).json({ message: 'cart not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting cart', error: error.message });
        }
    };
}

export default CartController;
