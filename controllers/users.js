const users = require("../models/users.js")
const fs = require("fs")
const path = require("path")

exports.getUsers = (req,res) => {
    return res.json(users)
}

exports.getUser = (req, res) => {
    const id = req.params["id"];
    const user =  users.find((item) => item.id == id);
    return res.json(user)
}

exports.createUser = (req, res) => {
    const data = req.body;

    let user = users[users.length - 1]?.id;


    const reqObject = {
        id: ++user || 1,
        ...data
    }


    users.push(reqObject)


    return res.json(users)
}

exports.deleteUser = (req, res) => {
    const id = req.params?.id;
     return res.json(users.filter(((item) => item.id !== Number(id))))
}

exports.updateUser = (req, res) => {
    const id = req.params?.id;
    const data = req.body;
    const user = users.find((item) => item.id === Number(id))
    if (!user) {
        return res.status(404).json({error:"User not exist"})
    }
    user.name = data.name;
    user.bio = data.bio;
    return res.json(user)
}