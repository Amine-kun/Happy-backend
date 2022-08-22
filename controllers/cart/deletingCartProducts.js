
const deletingCartProducts = async (req, res, client)=>{
   await client.connect();
      const {itemid, userid}= req.query;
      const newCartItems =[];

      client.db().collection("cart").deleteOne({id: itemid})
      const items = client.db().collection("cart").find({By: userid}) 
         await items.forEach((cartProduct)=>{
              newCartItems.push(cartProduct);
         })
          res.json(newCartItems);
        }

module.exports = {
	deletingCartProducts: deletingCartProducts
};