const expressValidator=require('express-validator')
const isAuth=(req,res,next)=>{
    if(req.session.userId){
        next()
    }
    else res.render('error',{userId:req.session.userId})
}

const isNotAuth=(req,res,next)=>{
    if(!req.session.userId){
        next()
    }
    else res.render('error',{userId:req.session.userId})
}

module.exports={
    isAuth,
    isNotAuth,  
}