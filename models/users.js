const database = require("../database");
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
 * Creates a new user by their ID.
 * @param {string} userid - The ID of the new user.
 * @param {string} firstName - The first name of the user.
 * @param {string} lastName - The last name of the user.
 * @param {string} [birthday=null] - The birthday of the user (optional).
 * @param {string} [maritalStatus=null] - The marital status of the user (optional).
 * @returns {Promise<{data: object|null, err: Error|null}>} - Object containing created user data or an error.
 */
async function createUserById(userid, firstName, lastName, birthday = null, maritalStatus = null) {
    const result = {
        data: null,
        err: null,
    };

    try {
        // Create a new user document
        const newUser = new Users({
            id: userid,
            first_name: firstName,
            last_name: lastName,
            birthday: birthday,
            marital_status: maritalStatus,
        });

        // Save the new user to the database
        result.data = await newUser.save();
    } catch (err) {
        result.err = getUserException("Failed to create user", err.message, {
            userid,
            firstName,
            lastName,
            birthday,
            maritalStatus,
        });
    }

    return result;
}


/**
 * Mongoose model for the "users" collection.
 */

const Users = database.mongoose.model("users", userSchema);

function removeAllUsers(){
    Users.deleteMany({});
}

module.exports = {
    Users,
getUserById,
createUserById,
removeAllUsers};

