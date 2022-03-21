
const route = require('express').Router()
const { isAuth, isNotAuth } = require('../middlewar/auth')
const bookControler = require('../controllers/book')


const check = require('express-validator').check


// init multer
const multer = require('multer')
const { Router } = require('express')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assits/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage })

// get the page of add book 
route.get('/add', isAuth, (req, res) => {
    res.render('addbook', {
        userId: req.session.userId,
        validationError: req.flash('validationError')
    })
})

route.post('/add', isAuth,
    upload.single('image'),
    check("name")
        .not()
        .isEmpty()
        .withMessage("book name is required"),
    check("description")
        .not()
        .isEmpty()
        .withMessage("book description is required"),
    check("auther")
        .not()
        .isEmpty()
        .withMessage("auther is required"),
    check('price').not().isEmpty().withMessage("book price is required"),
    check("image").custom((value, { req }) => {
        if (req.file) return true;
        else throw "image is required";
    }), bookControler.addBook)



route.get('/details/:id',isAuth,bookControler.getBookId) 

module.exports = route