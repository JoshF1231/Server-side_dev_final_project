/**
 * List of developers involved in the project.
 * @type {Array<{first_name: string, last_name: string}>}
 */

const Developers = [
    {
        "first_name" : "Raz",
        "last_name" : "Hagani"
    },
    {
        "first_name" : "Josh",
        "last_name" : "Fiquette"
    }]

/**
 * Retrieves all developers in the project.
 * @returns {{data: Array<{first_name: string, last_name: string}>|null, err: Error|null}} 
 * An object containing the list of developers or an error.
 */

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
