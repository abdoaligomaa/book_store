const {User}=require('../models/auth')
const {Book} =require('../models/book')

const getCartPage=async(req,res)=>{
    const user=await User.findById(req.session.userId).populate('products')
    const books=user.products
    res.render('cart',{
        userId:req.session.userId,
        books,
        error:req.flash('error')[0]

    })
}

const Addtocart=async(req,res)=>{
    const bookId=req.query.bookId
    const Mybook=await Book.findById(bookId)
    let  user=await User.findById(req.session.userId).populate('products')
  
   const bookIndex=user.products.findIndex((book)=>{
       return book.name==Mybook.name
   })
   if(bookIndex===-1){
       user.products.push(bookId)
       await user.save()
       res.redirect('/cart')
   }else{
    req.flash('error','this book in you cart , you can not add it !')
    res.redirect('/cart')
   }

    // let book=await Book.findById(user.products[0])
    // console.log(user.products[0])
    // console.log(book)



    
}


module.exports={
    Addtocart,
    getCartPage,
}