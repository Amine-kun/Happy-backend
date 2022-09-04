
const userContacts = async (req, res, client)=>{
     await client.connect();

        const userID =req.params.userid;
        const userContacts= [];

        const result = client.db().collection("contacts").find({$or: [{'to.userId': userID}, {'from.userId': userID}]})
            await result.forEach((product)=>{
                    userContacts.push(product);
                  });
            res.json(userContacts);
          }

module.exports = {
	userContacts: userContacts
};