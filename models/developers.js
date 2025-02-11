const Developers = [
    {
        "first_name" : "Raz",
        "last_name" : "Hagani"
    },
    {
        "first_name" : "Josh",
        "last_name" : "Fiquette"
    }]

function getAllDevelopers() {
    const result = {
        data: null,
        err: null
    };
    try{
        result.data =  Developers
    }
    catch(err){
        result.err = err;
    }
    return result;
}

module.exports = {
    getAllDevelopers
}
