const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

const mongoDB = "mongodb+srv://raz4799:UwcNnoryH85iI4sB@cluster0.tgfzp.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0"; // עדכון כתובת
//const mongoDB = "mongodb://localhost:27017/database";

//raz4799 UwcNnoryH85iI4sB

async function connect() {
    await mongoose.connect(mongoDB);
}

exports.connect = connect;
exports.mongoose = mongoose;