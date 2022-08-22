
const userInfo = async (req, res, client, ObjectID)=>{
   await client.connect();

      const userID = new ObjectID(req.params.userid);

      client.db().collection("users").findOne({_id: userID})
      .then((user)=> 
        res.json(user)
            )
      .catch(err=>res.status(400).json('cant find user'));
        }

module.exports = {
	userInfo: userInfo
};