
const uploading = async (req, res, client, uuid, bucket)=>{
          await client.connect();

            const image = req.file;
            const {productName, description, price, category, isColors, isSizes, userName, userId, userImage}= req.body;

            let isColorsTrue = (isColors == "true");
            let isSizeTrue = (isSizes == "true");

            if(!image.path && !productName && !description && !price){ 
                    res.status(400).json('make sure all fields are valid')
            }
            else {
                    const imgID = uuid();

                      bucket.upload(`${image.path}`, {
                          destination:`products/${image.originalname}`,
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
                                
                            client.db().collection("products").insertOne({
                                            productName:productName,
                                            productImage:url,
                                            description:description,
                                            price: parseInt(price),
                                            category:category,
                                            color:isColorsTrue,
                                            size:isSizeTrue,
                                            productBy:{
                                                userName:userName,
                                                userId:userId,
                                                userImage:userImage},
                                        })
                                            .then(()=>res.json("successfully user submited"))
                                            .catch(err=>res.status(400).json('cant login'))

                            })
                        }).catch(err => {
                          console.error('ERROR:', err);
                        });
                  }
         }

module.exports = {
	uploading: uploading
};