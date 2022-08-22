
const logining = async (req, res, client)=>{
  await client.connect();

    const {email, pass}= req.body;

    if(!email && !pass){ 
            res.status(400).json('enter valid info')
    }
    else {
        client.db().collection("login").findOne({email:email})
          .then((data)=>{
            if(pass === data.password){
              client.db().collection("users").findOne({email:data.email})
                .then((userData)=> res.json(userData))
                .catch(err=>res.status(400).json('error getting the userinfo'))
            } else {
              res.json('wrong password')
            }
          })
          .catch(err=>res.status(400).json('cant login'))
          }
 }

module.exports = {
	logining: logining
};