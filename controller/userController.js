const ProfileModel = require('../model/ProfileModel');



exports.createUser = async (req,res) => {

    const dataUser = req.body;
    

    try {
        const user = await ProfileModel(dataUser);

        user.save().then((result) => {
        res.json({status:200,user});
            
        }).catch((err) => {
            console.log(err)
        res.json({error:400, message:"Email duplicado"});
            
        });

    } catch (error) {
   
        console.log(error)
    }
  

}



