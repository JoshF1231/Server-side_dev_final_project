const database = require("../database");
const app = require("../app");

const costsSchema = new database.mongoose.Schema({
    description:String,category:String,userid:String,sum:Number,create_date:{type:Date,default:Date.now}
})



const Costs = database.mongoose.model("costs", costsSchema);

async function add_cost(description, category, userid, sum, create_date) {
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
//function createCollection(){
  //  database.mongoose.connections.createCollection('costs')(()=>{console.log('Database Connected!')}).
    //catch(err=>{console.error(err)});
//}
//exports.createCollection = createCollection;

async function get_costs_by_userid(userid){
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
    add_cost,
    get_costs_by_userid};
