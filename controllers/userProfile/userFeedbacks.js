
const userFeedbacks = async (req, res, client)=>{
     await client.connect();

        const userID =req.params.userid;
        const userFeedbacks= [];

        const result = client.db().collection("feedbacks").find({'to.userId': userID})
            await result.forEach((product)=>{
                    userFeedbacks.push(product);
                  });
            res.json(userFeedbacks);
          }

module.exports = {
	userFeedbacks: userFeedbacks
};