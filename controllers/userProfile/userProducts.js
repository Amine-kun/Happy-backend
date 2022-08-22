
const userProducts = async (req, res, client)=>{
     await client.connect();

        const userID =req.params.userid;
        const userProducts= [];

        const result = client.db().collection("products").find({'productBy.userId': userID})
            await result.forEach((product)=>{
                    userProducts.push(product);
                  });
            res.json(userProducts);
          }

module.exports = {
	userProducts: userProducts
};