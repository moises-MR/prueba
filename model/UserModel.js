const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({


    urlName : {
        type:String,
        trim:true,
        lowercase:true,

    },
    email: {
        type:String,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,   
    },
    nameProfile:{
        type:String,   

    },
    AboutMeText:{
        type:String,   

    },
    aboutMeTitle:{
        type:String,   

    },
    titleImg:{
        type:String,   

    },
    profecionProfile:{
        type:String,   

    },
    titleContact:{
        type:String,   

    },
    linkFace:{
        type:String,   

    },
    linkInsta:{
        type:String,   

    },
    numeroWhats:{
        type:String,   

    },
    images:{
        type:Array,   

    },
    contactBtnFace:{
        type:String,   

    },
    contactBtnEmail:{
        type:String,   

    },
    contactBtnLlamada:{
        type:String,   
    },
    contactBtnWhats:{
        type:String,   

    },
    imagePortada:{
        type:String, 
    },
    imageProfile:{
        type:String, 
    },
    btnActiveFace:{
        type:Boolean
    },
    btnActiveLlamada:{
        type:Boolean
    },
    btnActiveWhats:{
        type:Boolean
    },
    btnActiveCorreo:{
        type:Boolean
    },

    cardAvailable:{
        type:Boolean
    },
    tarjetaCreada:{
        type:Boolean
    },
    fechaCreacion:{
        type:String
    },
    diaPago:{
        type:String
    },
    vencimiento:{
        type:String
    },
    typeCard:{
        type:String
    },
    latitud:{
        type:Number
    },
    longitud:{
        type:Number
    },
    mapActive:{
        type:Boolean
    },
    CardPagada:{
        type:Boolean
    },
    calle:{
        type:String
    },
    numeroExt:{
        type:String
    },
    numeroInt:{
        type:String
    },
    colonia:{
        type:String
    },
    cp:{
        type:String
    },
    municipio:{
        type:String
    },
    estado:{
        type:String
    },
    mapaListo:{
        type:Boolean
    },
    idUser:{
        type:String
    }

    


    




});


module.exports = mongoose.model("users",userSchema);