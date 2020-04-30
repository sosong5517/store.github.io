const userAuthentication = async (req, res, service) => {
    
    
    try {
        const user = req.body;
        const userInfo = await service.authenticate(user);
        if (userInfo) {
            console.log('kogin masuk',userInfo)
            res.send(userInfo);
        } else {
            console.log('gak ada user info')
            res.sendStatus(401);
        }

    } catch (e) {
        res.sendStatus(500);
    }

};
const registerUser = async (req,res,service)=>{
    
    const user = req.body;
    const newUser = await service.registerUser(user);
    res.send(newUser)
}

const getMyUser = async (req,res,service)=>{
    const id = req.params.id;
    const MyUser = await service.getMyUser(id);
    if (MyUser==null ||MyUser==undefined) {
        res.json({
            status:"failed",
            statusCode:404,
            data:null
    
        })
        
    }
    else{
        res.json({
            status:"success",
            statusCode:200,
            data:MyUser
    
        })
    }
    
}
const getAllUsers = async(req,res,service)=>{
    const AllUsers = await service.getAllUsers();
    res.json({
        status:"success",
        data:AllUsers,
        statusCode:200
    })
}
const deleteUser= async(req,res,service)=>{
    var idUser = req.params.id
    const delUser = await service.deleteUser(idUser);
    console.log('qs',delUser)
    res.json({
        statusCode:200,
        message:" delete  user succes",
        data:delUser
    })
}
const updateUser = async(req,res,service)=>{
    idUser = req.params.id;
    const data = req.body
    const updatedUser = await service.updateUser(idUser,data);
    res.json({
        statusCode:200,
        message:" update  user succes",
        data:updatedUser
    })
}

module.exports = {
    userAuthentication,
    registerUser,
    getMyUser,
    getAllUsers,
    deleteUser,
    updateUser
};