
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

// const contactId = new ObjectID(req.body.convoId);
//       const msg = req.body.message;

//       if (msg === null) {
//         res.status(404).json('field must not be empty')
//       } else {

//         client.db().collection("contacts").updateOne(
//                     {_id:contactId},
//                         {$push: { 
//                               messages: {'time':'20:00pm',
//                                          'message':msg,
//                                          'from':'sender'} 
//                              } 
//                         })
//       .then(async ()=>{ 
//             const updatedConvo= [];

//             const result = client.db().collection("contacts").find({_id:contactId})
//                 await result.forEach((convo)=>{
//                         updatedConvo.push(convo);
//                       });

//                 res.json(updatedConvo);
//            })
//       .catch(err=>res.status(400).json('cant send this message'));
//         }