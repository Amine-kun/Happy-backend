
const addContact = async (req, res, client)=>{
    await client.connect();

    const {initialMessage, newFriend, from}= req.body;

    client.db().collection("users").findOne({name:newFriend}) 
        .then(async (user)=>{
              let userid = user._id.toString();

           const createContact = await client.db().collection("contacts").insertOne({
              from:{
                 userId: from.userId,
                 userName: from.userName,
                 userImage:from.userImage
                            },
              to:{
                 userId: userid,
                 userName: user.name,
                 userImage:user.userImage
              }
          }) 

           let convoid = createContact.insertedId.toString();
              console.log(convoid);

              const createAconversation = await client.db().collection("conversations").insertOne({
                    contactKey:convoid,
                    messages:[{
                      time:initialMessage.time,
                      message:initialMessage.message,
                      source:{
                         userId: from.userId,
                         userName: from.userName,
                         userImage:from.userImage
                      }
                    }]
                  })
        })
      .catch(err=>console.log("err at inserting cart product"))
  }

module.exports = {
	addContact: addContact
};