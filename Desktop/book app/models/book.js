const mongoose=require('mongoose')

const schema=mongoose.Schema({
    name:{
        type:String,
    },
    amount:{
        type:Number
    },
    description:{
        type:String,
    },
    auther:{
        type:String,
    },
    price:{
        type:Number, 
    },
    image:{
        type:String,
    },
})

const Book=mongoose.model('book',schema)
// add new book by admin
const AddNewBook=async(name,description,auther,price,image)=>{
    const book=new Book({
        name:name,
        description:description,
        auther:auther,
        price:price,
        image:image,
    })
    return book
}
// get book by id
const getBookById=async(id)=>{
    const book=await Book.findById(id)
    if(!book){
        throw 'there is not book in this id'
    }
    return book
}
module.exports={Book,
    AddNewBook,
    getBookById,
}