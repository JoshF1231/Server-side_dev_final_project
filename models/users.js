const database = require("../database");
const {router} = require("express/lib/application");

/**
 * Schema for user records in the database.
 */

const userSchema = new database.mongoose.Schema({
    id:String,first_name:String,last_name:String,birthday:String,marital_status:String
})

/**
 * Mongoose model for the "users" collection.
 */

const Users = database.mongoose.model("users", userSchema);


module.exports = Users;

