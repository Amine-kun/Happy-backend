
const gettingCartProducts = async (req, res, client)=>{
   await client.connect();

      const {userid} = req.params;
      const cartItems =[];

      const result = client.db().collection("cart").find({By: userid})
         await result.forEach((cartProduct)=>{
              cartItems.push(cartProduct);
         })
          res.json(cartItems);
        }

module.exports = {
	gettingCartProducts: gettingCartProducts
};