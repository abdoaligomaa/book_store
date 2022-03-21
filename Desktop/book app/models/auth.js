    const mongoose=require('mongoose')
    const bcrypt=require('bcrypt')
    // const url='mongodb://localhost/book-project'
    const url='mongodb+srv://abdoAli:1072000@cluster0.mikwk.mongodb.net/book-app-atlas?retryWrites=true&w=majority'
    mongoose.connect(url).then(console.log('db is connected'))
    const schema=new mongoose.Schema({
        name:{
            type:String,
            trim:true,
            // minlength:[10,'the lenght of name is low']
            
        },
        email:{
            type:String,
         },
        password:{
            type:String,
            
        },
        isAdmin:{
            type:String,
            default:false
        },
        products:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'book',
            }
        ]
    })
// sign up functio which creat new user if the email is unique and return Error if there is an email in the data base
const creatNewUser = async (name, mail, password) => {
    if(!mail||!password||!name){
        throw ('you should Enter the Name ane the Email and the Password')
    }
    let user = await User.findOne({ email: mail })
    if (user) {
        throw ('there is user in this mail')
    } else {
            const hashPass = await bcrypt.hash(password, 8)
             user = await User({
                name: name,
                email: mail,
                password: hashPass,
            })
            await user.save()
            return user
        
        
    }

}

// the log in function to take email and the password and chiech if the email in my data base and the passwod is correct or not
const findByCredintial = async (email, password) => {
    if(!email||!password){
        throw 'you should Enter both the Email and the password'
    }
    const user = await User.findOne({ email, email })
    if (!user) {
        throw ('you can not log in ? this email is not valid')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw ('you can not log in ? this password is not valid')

    }
    return user
}
const User=mongoose.model('user',schema)
module.exports={
    User,
    creatNewUser,
    findByCredintial
}

