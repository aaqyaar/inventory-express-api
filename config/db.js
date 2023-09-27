const mongoose = require("mongoose")

const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log("🚀 MongoDB connected")
    } catch (e) {
        console.log("Error", e)
        process.exit(1)
    }
}

module.exports = connectDB;