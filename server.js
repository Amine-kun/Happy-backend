const express = require('express');
const bodyParser= require('body-parser');
const bcrypt= require('bcrypt-nodejs');
const {uuid} = require("uuidv4");
const cors= require('cors');
const multer = require('multer');
const app = express();

const {MongoClient, ObjectID} = require('mongodb');
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51L0XZlIfzIYbrSO06EQjcvSUBdXeAqudA7KxQM1rHH9mdaKHK9FIvhaljoWWsBpkcybGxiFvuImrbtLgoMrVRkW4007PWCa2Rv');

const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors:{
    origin: "https://web-happy.herokuapp.com/",
    methods:["GET", "POST"],
  }
});

const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage, ref} = require('firebase-admin/storage');

const serviceAccount = require('./serviceAccountKey.json');





//mongodb settings
const uri = 'mongodb+srv://ecomApp:kokaKOKA@cluster0.ay8dz.mongodb.net/EcomDB?retryWrites=true&w=majority';
const client = new MongoClient(uri);


// Initialize Firebase
initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'ecom-app-9ff67.appspot.com'
});
const firebaseStorage = getStorage();
const bucket = firebaseStorage.bucket();


//multer settings
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './upload/');
  }, 
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
    });
const upload = multer({storage:storage});


//establishing socket.io connection

io.on('connection', (socket) =>{

  socket.on("join_chat", (data)=>{
    socket.join(data);
  })

  socket.on("send_message", (data)=>{
    socket.to(data.channel).emit("receive_message", data);
  })
})


// controllers
const loginController = require('./controllers/login&&register/login');
const registerController = require('./controllers/login&&register/register');

const homeController = require('./controllers/home/home');

const productPageController = require('./controllers/product/productPage');
const deleteProductController = require('./controllers/product/deleteProduct');
const loadRelatedProductsController = require('./controllers/product/loadRelatedProducts');

const userInfoController = require('./controllers/userProfile/userInfo');
const userProductsController = require('./controllers/userProfile/userProducts');
const userFeedbacksController = require('./controllers/userProfile/userFeedbacks');
const userContactsController = require('./controllers/userProfile/userContacts');

const gettingConvoMessagesController = require('./controllers/contact/contact');
const sendingMessageController = require('./controllers/contact/updateContact');
const creatingAContactController = require('./controllers/contact/addContact');

const addToCartController = require('./controllers/cart/addToCart');
const gettingCartProductsController = require('./controllers/cart/gettingCartProducts');
const deletingCartProductsController = require('./controllers/cart/deletingCartProducts');
const stripeChargesController= require('./controllers/cart/stripeCharges');

const searchingController= require('./controllers/search/search');

const addToWishlistController = require('./controllers/wishlist/addToWishlist');
const gettingWishlistProductsController = require('./controllers/wishlist/gettingWishlistProducts');
const deletingWishlistProductsController = require('./controllers/wishlist/deletingWishlistProducts');

const uploadingController = require('./controllers/upload/upload');





 app.use(cors())
 app.use(bodyParser.json());




//ENDPOINTS
 app.post('/login',(req, res)=>{loginController.logining(req, res, client)})
 app.post('/register', upload.single('file'), (req, res)=>{registerController.registering(req, res, client, uuid, bucket)})

 app.post('/',(req, res)=>{homeController.homePage(req, res, client)})

 app.get('/Product/:id',(req, res)=>{productPageController.productPage(req, res, client, ObjectID)})
 app.delete('/Product/:id', (req, res)=>{deleteProductController.deleting(req, res, client, ObjectID)})
 app.get('/RelatedProducts/:categoryid', (req, res)=>{loadRelatedProductsController.relatedProducts(req, res, client)})

 app.get('/user/:userid', (req, res)=>{userInfoController.userInfo(req, res, client, ObjectID)})
 app.get('/user/Products/:userid', (req, res)=>{userProductsController.userProducts(req, res, client)})
 app.get('/user/Feedbacks/:userid',(req, res)=>{userFeedbacksController.userFeedbacks(req, res, client)})
 app.get('/user/Contact/:userid',(req, res)=>{userContactsController.userContacts(req, res, client)})

 app.get('/user/conversation/:convoid', (req,res)=>{gettingConvoMessagesController.contact(req,res,client, ObjectID)})
 app.post('/user/conversation', (req,res)=>{sendingMessageController.sendingMessage(req,res,client, ObjectID)})
 app.post('/user/Contact', (req, res)=>{creatingAContactController.addContact(req,res,client)})

 app.post('/cart', (req, res)=>{addToCartController.addToCart(req, res, client)})
 app.get('/cart/:userid', (req, res)=>{gettingCartProductsController.gettingCartProducts(req, res, client)})
 app.delete('/cart', (req, res)=>{deletingCartProductsController.deletingCartProducts(req, res, client)})
 app.post('/checkout', (req, res)=>{stripeChargesController.stripeCharges(req, res, client, stripe)})

 app.post('/search', (req, res)=>{searchingController.searching(req, res, client)})

 app.post('/wishlist', (req, res)=>{addToWishlistController.addToWishlist(req, res, client)})
 app.get('/wishlist/:userid', (req, res)=>{gettingWishlistProductsController.gettingWishlistProducts(req, res, client)})
 app.delete('/wishlist', (req, res)=>{deletingWishlistProductsController.deletingWishlistProducts(req, res, client)})

 app.post('/upload', upload.single('file'), (req, res)=>{uploadingController.uploading(req, res, client, uuid, bucket)})


 app.use(express.static('upload'));
 server.listen(3001, ()=> console.log("listening..."));