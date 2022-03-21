const userControl = require('../controllers/auth')
const { isAuth, isNotAuth } = require('../middlewar/auth') 
const check = require('express-validator').check;

const Router = require('express').Router()
// get sign up page 
Router.get('/signup', isNotAuth, (req, res) => {
    res.render('signup',{ userId: req.session.userId,
        authError: req.flash('authError')[0],
        validationError:req.flash('validationError'),
        })
})
//get log in  page 
Router.get('/login', isNotAuth, (req, res) => {
    res.render('login', { userId: req.session.userId,
         authError: req.flash('authError')[0],
         validationError:req.flash('validationError'),
         })
})
// creat new user in this app
Router.post('/signup', isNotAuth, 
    check("name")
    .not()
    .isEmpty()
    .withMessage("username is required"),
    check("email")
        .not()
        .isEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid format"),
    check("password")
        .not()
        .isEmpty()
        .withMessage("password is required")
        .isLength({ min: 6 })
        .withMessage("password must be at least 6 charachters"), userControl.signUP)
// log in user to my website 
Router.post('/login', isNotAuth,check("email")
    .not()
    .isEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid format"),
    check("password")
    .not()
    .isEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 charachters"),
 userControl.login)

Router.post('/logout', async (req, res) => {
    req.session.userId = undefined
    res.redirect('/login')
})


module.exports = Router
