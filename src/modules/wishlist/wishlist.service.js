import  wishlistRepository from './wishlist.repository.js';

class WishlistService {
    constructor(){
         this.wishlistRepository = new wishlistRepository();
    }

    async getAllWishlist(){
        try {
            return await this.wishlistRepository.getAllWishlist();
        }
        catch (error){
            throw new Error('Error fetching category: ' + error.message);
        }
    }
     
    async getWishlistById(id){
        try{
            const wishlist = await this. wishlistRepository.getWishlistById(id);
            if(!wishlist){
                throw new Error('wishlist not found');
            }
            return wishlist;
        }
        catch(error){
            throw new Error('Error fetching wishlist:' + error.message);
        }
    }
    async getWishlistByUserId(id){
        try{
            const wishlistByUserId = await this. wishlistRepository.getWishlistByUserId(id);
           
            return wishlistByUserId;
        }
        catch(error){
            throw new Error(error.message);
        }
    }

    async createWishlist(userId, productId) {
        try {
            const alreadyExists = await this.wishlistRepository.checkIfExists(userId, productId);
            console.log(alreadyExists, "aldeeeeee");

            if (alreadyExists) {
                throw new Error('This wishlist entry already exists');
            }
            return await this.wishlistRepository.createWishlist(userId, productId);
        } catch (error) {
            throw new Error('Error creating wishlist: ' + error.message);
        }
    }
    
    async updateWishlist( id, userId, productId){
        try{
            return await this.wishlistRepository.updateWishlist(id, userId, productId);
        }
        catch(error){

         throw new Error('Error updating wishlist:' + error.message);
        }
    }

     async deleteWishlist(id){
        try {
            return await this.wishlistRepository.deleteWishlist(id);
        }
        catch (error){
            throw new Error('Error deleting wishlist:' + error.message);
        }
     }
    }
     export default WishlistService


