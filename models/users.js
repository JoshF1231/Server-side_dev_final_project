const database = require("../database");
const {router} = require("express/lib/application");

const userSchema = new database.mongoose.Schema({
    id:String,first_name:String,last_name:String,birthday:String,marital_status:String
})

const users = database.mongoose.model("users", userSchema);

//function createCollection(){
  //  database.mongoose.connections.createCollection('users')(() => {console.log('Database Connected!')}).
    //catch(err => {console.error(err)});
//}
module.exports = users;

//exports.createCollection = createCollection;
