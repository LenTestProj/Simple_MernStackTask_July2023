const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema({
    email:{
      type:String,
      required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    images:[
        {
            imageUrl:{
                type:String,
                required:true
            },
            fileName:{
                type:String,
                required:true
            }
        }
    ],
    employees:[{
        type:Schema.Types.ObjectId,
        ref:'Employee'
    }]
})

module.exports=mongoose.model('User',userSchema);