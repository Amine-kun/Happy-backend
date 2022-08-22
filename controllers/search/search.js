
const searching = async (req, res, client)=>{
   await client.connect();
      const {searchTerm}= req.body;
      const searchedProducts =[];

      const items = client.db().collection("products").aggregate([
                                      {
                                        '$search': {
                                          'index': 'default',
                                          'text': {
                                            'query': `${searchTerm}`,
                                            'path': {
                                              'wildcard': '*'
                                            }
                                          }
                                        }
                                      }
                                    ]) 
         await items.forEach((product)=>{
              searchedProducts.push(product);
         })
          res.json(searchedProducts);
        }

module.exports = {
	searching: searching
};