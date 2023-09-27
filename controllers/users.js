
const Users = require("../models/users")


exports.getUsers = async(req,res) => {
    const users = await Users.find({}).select("-password");
    return res.json(users)
}

exports.getUser = async(req,res) => {
  try {
      const id = req.params.id;

      const user =  await Users.findById(id).select("-password");

      if (!user) {
          res.status(404).json({error: "User not found"})
      }
      return res.json(user)
  } catch (e) {
     return res.status(500).json(e)
  }
}

exports.createUser = async(req, res) => {
   try {
       const data = req.body;

       const isUserExist = await Users.findOne({
           phone: data.phone
       })

       if (isUserExist) {
           return res.status(400).json({
               error: "User already exists"
           })
       }

       const creation = new Users(data);
       await creation.save();
       return res.json(creation)
   } catch (e) {
       return res.status(500).json(e)
   }
}

exports.deleteUser = async(req, res) => {
    try {
        const id = req.params?.id;
        if(!await Users.findByIdAndDelete(id)) {
            return res.status(500).json({error: "User not exist"})
        }
        return res.status(204).json();
    } catch (e) {
        return  res.status(500).json(e)
    }
}

exports.updateUser = async (req, res) => {
    try {
        const id = req.params?.id;
        const data = req.body;

        const user = await Users.findByIdAndUpdate(id, {
            ...data
        }, {
            new:true
        }).select("-password")

        return res.json({
           user,
            message: "User updated successfuly"
        })
    } catch (e) {
        return  res.status(500).json(e)
    }
}