// const e = require('connect-flash')
const {Book,getBookById,AddNewBook}=require('../models/book')
const validationResult = require('express-validator').validationResult
const mongoose=require('mongoose')



const addBook=async(req,res)=>{
    if(validationResult(req).isEmpty()){
        const book= await AddNewBook(req.body.name,req.body.description,req.body.auther,req.body.price,req.file.filename)
        await book.save()
        res.redirect('/')
    }else{
        req.flash('validationError',validationResult(req).array())
        res.redirect('/book/add')   
    }
}
const getBookId=async(req,res)=>{
    try{
        // const id=mongoose.Types.ObjectId(req.params.id)
        const id=req.params.id
        const book=await getBookById(id)
        console.log(id,'  ',book)

        res.render('book detales',{
            userId: req.session.userId,
            book:book,
         })
        
    }catch(e){
        console.log(e)
        req.flash('error',e)
        res.redirect('/error')

    }
    // console.log(req.params.id)
}

module.exports={
    addBook,
    getBookId,
}