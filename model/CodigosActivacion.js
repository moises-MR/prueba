const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CodigosActivacionSchema = new Schema({

    codigo:{
        type:String
    },

});

module.exports = mongoose.model("codigos",CodigosActivacionSchema);