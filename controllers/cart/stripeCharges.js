
const stripeCharges = async(req, res, client, stripe)=>{
         await client.connect();

         const {tokenId, amount, userId, userName, userEmail, orders}= req.body;

         stripe.charges.create(
         {
            source: tokenId,
            amount: amount*100,
            currency: "usd"
         }, async (stripeErr, stripeRes)=>{
            if(stripeErr){
                res.status(500).json(stripeErr)
            } else {
                res.status(200).json(stripeRes)

                const Order = await client.db().collection("orders").insertOne({
                    _id:tokenId,
                    buyer: userName,
                    buyerId: userId,
                    orderTotal: amount,
                    orders:{...orders},
                    orderInfo: stripeRes
                })
            }
         })


   }

module.exports = {
	stripeCharges: stripeCharges
};