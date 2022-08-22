
const addToCart = async (req, res, client)=>{
    await client.connect();

    const {id, productName, productImage, price, userSavedBy, quantity, category}= req.body;

    const cartItem = await client.db().collection("cart").insertOne({
              id:id,
              productName:productName,
              productImage:productImage,
              price: price,
              quantity:quantity,
              category:category,
              By: userSavedBy
          }) 
        .then(()=>res.json("successfully added"))
        .catch(err=>console.log("err at inserting cart product"))
  }

module.exports = {
	addToCart: addToCart
};