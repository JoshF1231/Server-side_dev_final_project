const database = require("../database");
const { addCostException, getCostsException} = require('./exceptions');
const {getUserById} = require("./users");
const {createUserById} = require("./users");


/**
 * Schema for cost entries in the database
 */

const costsSchema = new database.mongoose.Schema({
    description:String,category:String,userid:String,sum:Number,create_date:{type:Date,default:Date.now}
})


/**
 * Mongoose model for the "costs" collection
 */

const Costs = database.mongoose.model("costs", costsSchema);

/**
 * Adds a new cost entry to the database.
 * @param {string} description - Description of the expense
 * @param {string} category - Category of the expense
 * @param {string} userid - ID of the user associated with the expense
 * @param {number} sum - Amount of the expense
 * @param {Date} createDate - Date of creation (default is the current date)
 * @param {string} firstName - First Name of the User (default is "John")
 * @param {string} lastName - Last Name of the User (default is "Doe")
 * @returns {Promise<{data: object|null, err: Error|null}>} - Object containing the new cost entry or an error
 */

async function addCost(description, category, userid, sum, createDate, firstName = "John", lastName = "Doe") {
    const result = {
        data:null, err:null
    }

    try{
        let userResult = await getUserById(userid);
        if (userResult.err){
            throw new Error(userResult.err);
        }
        if (!userResult.data) {
            const newUserResult = await createUserById(userid, firstName, lastName);
            if (newUserResult.err) {
                throw new Error("Failed to create user: " + newUserResult.err.message);
            }
        }
        result.data = await Costs.create({description: description, category: category, userid: userid, sum: sum, create_date:createDate});
    }
    catch(err) {
        result.err = addCostException('Failed to add cost', err.message, {
            description, category, userid, sum, createDate
        });
    }
    return result;
}

/**
 * Retrieves all cost entries for a given user.
 * @param {string} userid - The user ID
 * @returns {Promise<{data: object[]|null, err: Error|null}>} - Object containing an array of cost entries or an error
 */

async function getCostsByUserId(userid){
    const result = {
        data:null, err:null
    }
    try{
        result.data = await Costs.find({ userid: userid });
    } catch(err) {
        result.err = getCostsException('Failed to get cost', err.message, { userid });
    }
    return result;
}


module.exports = {
    Costs,
    addCost,
    getCostsByUserId,};
