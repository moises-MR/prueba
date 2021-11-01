const CodigosActivacion = require('../model/CodigosActivacion');
const UserModel = require('../model/UserModel');


exports.createCodigo = async (req,res) => {



    try {
  
      const newCodigo = new CodigosActivacion(req.body)
      await newCodigo.save();
  
      res.json({status:200,newCodigo})
      
    } catch (error) {
      console.log(erro)
    }
  
  
}


exports.searchCodigos = async (req,res) => {

    const { id, codigo } = req.body;

    // console.log(req.body);

try {
    
    const existeCodigo = await CodigosActivacion.findOne({codigo});

        if(existeCodigo){
           await UserModel.findOneAndUpdate({_id:id},{CardPagada:true})
            await CodigosActivacion.findOneAndDelete({codigo});
         res.json({status:200});

        }else{
         res.json({status:400});

        }
} catch (error) {
    console.log(error);
}

}
