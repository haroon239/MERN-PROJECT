const mongoose=require('mongoose');

const userschema=mongoose.Schema({
    fullname:{type:String, required:true},
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
})

const Users=mongoose.model('users',userschema);

module.exports=Users;