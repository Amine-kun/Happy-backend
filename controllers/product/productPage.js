
const productPage = async (req, res, client, ObjectID)=>{
   await client.connect();

      const productId = new ObjectID(req.params.id);

      client.db().collection("products").findOne({_id: productId})
      .then((product)=> 
        res.json(product)
            )
      .catch(err=>res.status(400).json('failed to load product'));
        }

module.exports = {
	productPage: productPage
};