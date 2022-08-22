
const gettingWishlistProducts = async (req, res, client)=>{
   await client.connect();

      const {userid} = req.params;
      const cartItems =[];

      const result = client.db().collection("wishlist").find({By: userid})
         await result.forEach((cartProduct)=>{
              cartItems.push(cartProduct);
         })
          res.json(cartItems);
        }

module.exports = {
	gettingWishlistProducts: gettingWishlistProducts
};