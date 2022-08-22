
const relatedProducts = async (req, res, client)=>{
   await client.connect();

      const categoryId = req.params.categoryid;
      const relatedArray= [];

      const result = client.db().collection("products").find({category: categoryId})
          await result.forEach((product)=>{
                  relatedArray.push(product);
                });
          res.json(relatedArray);
        }

module.exports = {
	relatedProducts: relatedProducts
};