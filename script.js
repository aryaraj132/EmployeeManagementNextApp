const User = require("./userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const dotenv = require("dotenv")
dotenv.config()
if (mongoose.connections[0].readyState) {
    pass
  }else{
  // Use new db connection
  mongoose.connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
}
const adminName = "admin";
const adminEmail = "aryaraj132@gmail.com";
const adminPassword = "admin123";
var createAdmin = async function() {
    const getUser = await User.findOne({email: adminEmail});
    if(getUser) {
        console.log("Admin already exists");
        mongoose.connection.close()
        return false;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(adminPassword, salt)
    const admin = await new User({
        name:adminName,
        email:adminEmail,
        password:hashedPass,
        isAdmin:true
    })
    await admin.save()
    mongoose.connection.close()
    console.log("Admin created successfully", admin);
    return
};

createAdmin();