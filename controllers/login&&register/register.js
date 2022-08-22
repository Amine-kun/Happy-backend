
const registering = async (req, res, client, uuid, bucket)=>{
  await client.connect();

    const image = req.file;
    const {name, location, about, email, pass}= req.body;

    if(!email && !pass && !location && !name && !about && !image.path){ 
            res.status(400).json('make sure all fields are valid')
    }
    else {
            const imgID = uuid();

              bucket.upload(`${image.path}`, {
                  destination:`userImage/${image.originalname}`,
                  gzip: true,
                  metadata: {
                    cacheControl: 'public, max-age=31536000',
                      firebaseStorageDownloadTokens: imgID
                  }

                }).then((data) => {
                  let file = data[0];

                let imgURL= Promise.resolve("https://firebasestorage.googleapis.com/v0/b/" + bucket.name 
                                    + "/o/" 
                                    + encodeURIComponent(file.name) 
                                    + "?alt=media&token=" 
                                    + imgID)
                          
                    .then((url)=>{
                        client.db().collection("users").createIndex({email:1},{unique:true})
                        .catch(err=>console.log("enter a unique email"))

                        client.db().collection("users").insertOne({
                            name:name,
                            email:email,
                            country:location,
                            about:about,
                            userImage:url,
                        })
                            .then(()=>res.json("successfully user submited"))
                            .then(()=>{
                                client.db().collection("login").insertOne({
                                            name:name,
                                            email:email,
                                            password:pass,
                                        })
                            })
                            .catch(err=>res.status(400).json('cant login'))

                    })
                }).catch(err => {
                  console.error('ERROR:', err);
                });
          }
 }

module.exports = {
	registering: registering
};