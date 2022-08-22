
const addToWishlist = async (req, res, client)=>{
    await client.connect();

    const {_id, productName, productImage, price, category, userSavedBy}= req.body;

    const cartItem = await client.db().collection("wishlist").insertOne({
              id:_id,
              productName:productName,
              productImage:productImage,
              price: price,
              category:category,
              By: userSavedBy
          }) 
        .then(()=>res.json("successfully added"))
        .catch(err=>console.log("err at inserting cart product"))
  }

module.exports = {
	addToWishlist: addToWishlist
};