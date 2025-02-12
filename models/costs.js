const database = require("../database");
const app = require("../app");

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
 * @param {Date} create_date - Date of creation (default is the current date)
 * @returns {Promise<{data: object|null, err: Error|null}>} - Object containing the new cost entry or an error
 */

async function addCost(description, category, userid, sum, create_date) {
    const result = {
        data:null, err:null
    }

    try{
        result.data = await Costs.create({description: description, category: category, userid: userid, sum: sum, create_date:create_date});
    }
    catch(err) {
        result.err = err;
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
        result.err = err;
    }
    return result;
}


module.exports = {
    Costs,
    addCost,
    getCostsByUserId};
