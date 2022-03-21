const { User, creatNewUser, findByCredintial } = require('../models/auth')
const validationResult = require('express-validator').validationResult


// sign up functio which creat new user if the email is unique and return Error if there is an email in the data base
const signUP = async (req, res) => {
    if(!validationResult(req).isEmpty()){
        req.flash('validationError',validationResult(req).array())
        res.redirect('/signup')
    }else{
    try {
        const user = await creatNewUser(req.body.name, req.body.email, req.body.password)
        req.session.userId = user._id
        res.redirect('/')
    } catch (e) {
        req.flash('authError', e)
        res.redirect('/signup')
    }
    }
}

// the log in function to take email and the password and chiech if the email in my data base and the passwod is correct or not
const login = async (req, res) => {
    if(!validationResult(req).isEmpty()){
        req.flash('validationError',validationResult(req).array())
        res.redirect('/login')
        
    }else{
    try {
        const user = await findByCredintial(req.body.email, req.body.password)
        req.session.userId = user._id
        res.redirect('/')
    } catch (e) {
        req.flash('authError', e)
        res.redirect('/login')
    }}
}

module.exports = {
    signUP,
    login,

}