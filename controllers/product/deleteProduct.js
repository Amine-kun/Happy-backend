
const deleting = async (req, res, client, ObjectID)=>{
   await client.connect();
   
   const id = new ObjectID(req.params.id);

      client.db().collection("products").deleteOne({_id: id})
      client.db().collection("cart").deleteOne({id: req.params.id})
      client.db().collection("wishlist").deleteOne({id: req.params.id})
      .then(()=>
        res.json("product deleted") )
         .catch(err=> res.status(400).json("error at deleting product"))
        }

module.exports = {
	deleting: deleting
};