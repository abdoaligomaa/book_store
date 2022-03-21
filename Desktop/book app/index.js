const express = require('express')
const expressValidator=require('express-validator');
const User= require('./models/auth')
const {Book,AddNewBook,getBookById}=require('./models/book')
const userRouter=require('./routers/auth')
const bookRouter=require('./routers/book')
const cartRouter=require('./routers/cart')
const {isAuth,isNotAuth}=require('./middlewar/auth')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 1000;
const flash=require('connect-flash')
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore({
    // uri: 'mongodb://localhost/book-project',
    uri:'mongodb+srv://abdoAli:1072000@cluster0.mikwk.mongodb.net/book-app-atlas?retryWrites=true&w=majority',
    collection: 'mySessions',

    // By default, sessions expire after 2 weeks. The `expires` option lets
    // you overwrite that by setting the expiration in milliseconds
    expires: 1000 * 60 * 60 * 24 * 30, // 30 days in milliseconds

    // Lets you set options passed to `MongoClient.connect()`. Useful for
    // configuring connectivity or working around deprecation warnings.
    connectionOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000
    }
});

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(flash())
const staticFolder = path.join(__dirname, 'assits')
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static(staticFolder))
app.use(session({
    secret: 'this is secret for session in book project',
    store: store,
    saveUninitialized: true,
    resave: true,
}))

app.use('/',userRouter)
app.use('/book',bookRouter)
app.use('/cart',cartRouter)


app.get('/', async(req, res) => {
    const threeBooks= await Book.find({}).limit(3)
    res.render('home',{threeBooks,userId:req.session.userId})

})
app.get('/products', async(req, res) => {
    const allBooks= await Book.find({})

    res.render('products',{allBooks,userId:req.session.userId})

})
app.get('/about', (req, res) => {
    res.render('about',{userId:req.session.userId})

})
app.get('/contact',isAuth, (req, res) => {
    res.render('contact',{userId:req.session.userId})

})

app.get('/error', (req, res) => {
    res.render('error',{userId:req.session.userId,
    error:req.flash("error")[0]
    })

})





app.listen(PORT, () => console.log(`this server listen at port ${PORT}`))