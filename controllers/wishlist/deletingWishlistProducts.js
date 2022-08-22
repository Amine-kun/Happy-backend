
const deletingWishlistProducts = async (req, res, client)=>{
   await client.connect();
      const {itemid, userid}= req.query;
      const newCartItems =[];

      client.db().collection("wishlist").deleteOne({id: itemid})
      const items = client.db().collection("wishlist").find({By: userid}) 
         await items.forEach((cartProduct)=>{
              newCartItems.push(cartProduct);
         })
          res.json(newCartItems);
        }

module.exports = {
	deletingWishlistProducts: deletingWishlistProducts
};