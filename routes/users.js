const express = require("express");
const router = express.Router();
const users = require("../controllers/users")

const path = "/users";

router.get(path, users.getUsers);
router.get(`${path}/:id`, users.getUser);
router.post(path, users.createUser)
router.delete(`${path}/:id`, users.deleteUser)
router.put(`${path}/:id`, users.updateUser)

module.exports = router;
