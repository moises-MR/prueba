const UserModel = require('../model/UserModel')
const CodigosActivacion = require('../model/CodigosActivacion')
const bcrypt = require("bcrypt");
const jsonWebTkn = require("jsonwebtoken");
const NodeGeocoder = require('node-geocoder');



 
exports.createProfile = async (req,res,next) => {


    const { id } = req.params;
   
 
    let arrayImage = []


    if(req.files.length > 0){
        // console.log(req.files)
      

    req.files.forEach(element => {
           arrayImage.push(element?.filename)
    });


    req.body.images = arrayImage;  

    

    }



    
 

    try {
       const newProfile = await UserModel.findOneAndUpdate({_id:id},req.body);
      // console.log(newProfile)
        if(newProfile){

          if(req.body?.codigoPromo){

            const codigo = await CodigosActivacion.findOne({codigo:req.body?.codigoPromo})
          
            if(codigo){
            await UserModel.findOneAndUpdate({_id:id},{CardPagada:true});
             await CodigosActivacion.findOneAndDelete({codigo:req.body?.codigoPromo}) 
            }
          }
          
          res.json({status:200,newProfile})
        }else{
          res.json({status:400})
        }

    } catch (error) {
        console.log(error)
    }



    // console.log(req.body)


}



exports.imagePortada = async (req,res) => {


    const { id } = req.params;


    if(req.file){


        const imageName = req?.file?.filename
        
        await UserModel.findOneAndUpdate({ _id: id },{ imagePortada: imageName })
          .then((result) => {
            res.json({status:200})
          })
          .catch((err) => {
              console.log(err)
            res.json({status:400})
          });
        

    }else{

      res.json({status:200})


    }

}

exports.imageProfile = async (req,res) => {


    const { id } = req.params;


    if(req.file){


        const imageName = req?.file?.filename
        
        await UserModel.findOneAndUpdate({ _id: id },{ imageProfile: imageName })
          .then((result) => {
            res.json({status:200});
          })
          .catch((err) => {
              console.log(err)
            res.json({status:400});
          });
        

    }else{

      res.json({status:200})

    }


   



}


exports.searchNameUrl = async (req,res) => {

        

  try {

   const user = await UserModel.find({urlName:req.body.llave})
   
    res.json({user})

  } catch  (error) {
      console.log(error)

  }
}


exports.createAccount = async (req,res) => {




  try {
    
    const newAccount = new UserModel(req.body);
    newAccount.password = await bcrypt.hash(req.body.password, 12);

    // console.log(newAccount);
    newAccount.save().then((result) => {
      res.json({status:200,user:newAccount})
    }).catch((err) => {
      res.json({status:400,message:"Ese email ya esta registrado"})
    });

  } catch (error) {
    console.log(error)
  }


}



// Al inicar sesion utilizar jsonwebtoken
exports.inicarSesion = async (req,res,next) => {

  const{email,password} = req.body;
     

  const usuario = await UserModel.findOne({email});
  if(!usuario){
      // Si el eusuario no existe
      await res.json({
          mensaje:"El usuario no existe",
          id:401,
          mensaje2:"registrate"
      });
      next();
  }else{
      // El usuario si existe validar el password
      if(!bcrypt.compareSync(password,usuario.password)){
              await res.json({
                  mensaje:"Password incorrecto",
                  id:401,
                  mensaje2:"¿Olvidaste tu contraseña?"
              });
          
              next();
      }else{
          // El usuario si existe y la contraseña es correcta
          
          // token JsonWebToken
       
          const token = jsonWebTkn.sign({
              id:usuario._id

          },"K*!O^%T&ACfFNugA4CxNpc8IWu",{
              expiresIn: "1min",

          });

          //retornar el token

          res.json({token,status:200});
      }
      

  }

}






exports.getProfile = async (req,res,next) => {

  const { id } = req.params;
 
  try {
      const userProfile = await UserModel.find({_id:id})
      // console.log(userProfile)
     res.json({status:200,userProfile});
  } catch (error) {
      console.log(error)
      next()
  }
}


exports.getProfileWithNameUrl = async (req,res,next) => {

  const { urlName } = req.params;
  
  try {
      const userProfile = await UserModel.find({urlName});

    if(userProfile){
      if(userProfile.length > 0){

       res.json({status:200,userProfile});

      }else{
        res.json({status:401});
      }
    }
  } catch (error) {
      console.log(error)
      next()
  }
}










// exports.createProfile = async (req,res,next) => {

//     const dataProfile = req.body;


//     if(req.file.filename){
//         dataProfile.img1 = req.file.filename;
//     }

//     try {
//         const userProfile = ProfileModel(dataProfile);
//         await userProfile.save()
//         res.json(userProfile)
//     } catch (error) {
//         res.json({message:"El perfil ya existe"})
//         console.log(error)
//         next()
//     }
// }



exports.searchLatitud = async () => {

  const options = {
    provider: "google",
    httpAdapter: "https",
    apiKey: "AIzaSyAmdii3xDrKJ82T_bgMY2E0j-YUdYifuww", // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
  };
  const geocoder = NodeGeocoder(options);
  const res = await geocoder.geocode('29 champs elysée paris');


try {

  console.log(res);
  

} catch (error) {
  console.log(error);
}

}




exports.updatePassword= async (req,res) => {




  try {

    req.body.password = await  bcrypt.hash(req.body.password, 12);


     await UserModel.findByIdAndUpdate(
     { _id: req.body._id },
     { password: req.body.password }
   )
   .then((result) => {
    res.json({status:200})
    
   }).catch((err) => {
    res.json({status:400})
     console.log(err);
   });
   

  } catch (error) {
    console.log(error)
  }

}



exports.updateEmail = async (req,res) => {

  try {




     await UserModel.findByIdAndUpdate(
     { _id: req.body._id },
     { email: req.body.email }
   )
   .then((result) => {
    res.json({status:200})
    
   }).catch((err) => {
    res.json({status:400})
     console.log(err);
   });
   

  } catch (error) {
    console.log(error)
  }
}


exports.home = (req,res) => {

  res.send("HOLA MUNDO")

}