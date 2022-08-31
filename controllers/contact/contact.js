
const contact = async (req, res, client, ObjectID)=>{
   await client.connect();

      const contactId = new ObjectID(req.body.convoId);
      const msg = req.body.message;

      client.db().collection("contacts").updateOne(
                    {_id:contactId},
                        {$push: { 
                              messages: {'time':'20:00pm',
                                         'message':msg,
                                         'from':'me'} 
                             } 
                        })
      .then((convo)=> 
        // res.json(contact)
        console.log(convo)
            )
      .catch(err=>res.status(400).json('cant find user'));
        }

module.exports = {
	contact: contact
};