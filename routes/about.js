var express = require('express');
const {getCostsByUserId} = require("../models/costs");
const {getAllDevelopers} = require("../models/developers");
const {getDevelopersException} = require("../models/exceptions");
var router = express.Router();

/**
 * GET route to retrieve the list of developers.
 * @route GET /
 * @group Developers - Operations related to developers
 * @returns {Array<Object>} 200 - A list of developers
 * @returns {Object} 500 - Internal server error
 */

router.get('/', async function(req, res, next) {
    try {
        const developers = getAllDevelopers();
        if(developers.err) {
            return res.status(500).json({ error: getDevelopersException('Failed to retrieve developers', developers.err.message) });
        }
        return res.json(developers.data);
    } catch(err) {
        return res.status(500).json({ error: getDevelopersException('Unexpected server error', err.message) });
    }
});

module.exports = router;
