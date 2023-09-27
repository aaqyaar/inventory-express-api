const {Schema, model} = require("mongoose")
const bcrypt = require("bcryptjs")

const schema = new Schema({

    name: { type:String, required: true},
    phone : {type:String, unique:true, required:true},
    password: {type:String}
})


schema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password =  await bcrypt.hash(this.password, salt);
    next();
});

// hash, compare password
schema.methods.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
}

schema.methods.comparePassword = async (hashed, password) => {
   return await bcrypt.compare(hashed, password)
}

module.exports = model("User", schema)

