const mongoose=require('mongoose');

const mongooseConnect=(callback)=>{
    mongoose.connect('mongodb+srv://Len:mongodbworld@cluster0.ue7keab.mongodb.net/test?retryWrites=true&w=majority',{
        useNewUrlParser:true,
        useUnifiedTopology:true
      }).then(()=>{
       callback();
    }).catch(err=>{
        console.log('error occured while connecting to the database is: '+err);
    })
}

module.exports=mongooseConnect;