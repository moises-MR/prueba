const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const profileSchema = new Schema({


  email:{
      type:String,
      lowercase:true,
      unique:true
  },
  password:{
      type:String
  }

    



});

module.exports = mongoose.model("profile_data",profileSchema);