const sendingMessage = async (req, res, client, ObjectID) => {
    await client.connect();

    const {convoId, time, message, source} = req.body;

      client.db().collection("conversations").updateOne(
                    {contactKey:convoId},
                        {$push: { 
                              messages: {'time':time,
                                         'message':message,
                                         'source':{
                                                userId:source.userId,
                                                userName:source.userName,
                                                userImage:source.userImage,
                                          }} 
                             } 
                        })
      .then(()=>{ 
           res.json("message has been sent")
           })
      .catch(err=>res.status(400).json('cant send this message'));
}

module.exports = {
    sendingMessage:sendingMessage
};