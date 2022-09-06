
const contact = async (req, res, client, ObjectID)=>{
   await client.connect();

        const convoId = req.params.convoid;

        client.db().collection("conversations").findOne({contactKey: convoId})
            .then((convo)=>
                res.json(convo)
                )
            .catch((err)=>
                res.status(404).json("could not retrieve the conversation")
                    )


      }

module.exports = {
	contact: contact
};
