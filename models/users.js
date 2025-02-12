const database = require("../database");
const {router} = require("express/lib/application");
const {getUserException} = require("./exceptions");

/**
 * Schema for user records in the database.
 */

const userSchema = new database.mongoose.Schema({
    id:String,first_name:String,last_name:String,birthday:String,marital_status:String
})

async function getUserById(userid){
    const result = {
        data: null,
        err: null
    };
    try{
        result.data = await Users.findOne({id: userid});
    }
    catch(err){
        result.err = getUserException('Failed to retrieve user', err.message, { userid });
    }
    return result;

}

/**
 * Mongoose model for the "users" collection.
 */

const Users = database.mongoose.model("users", userSchema);


module.exports = {
    Users,
getUserById,};

