
const homePage = async (req, res, client)=>{
  await client.connect();

    const {category}= req.body;
    const productsArray = [];

    const products =  client.db().collection("products").find({category:category})
    await   products.forEach((product)=>{ 
                  productsArray.push(product);
                });
   res.json(productsArray);
      
 }

module.exports = {
	homePage: homePage
};