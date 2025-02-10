var express = require('express');
const {getCostsByUserId} = require("../models/costs");
const {getAllDevelopers} = require("../models/developers");
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
    try {
        const developers = getAllDevelopers();
        if(developers.err) {
            return res.status(500).json({error: costs.err.message});
        }
        return res.json(developers.data);
    } catch(err) {
        return res.status(400).json({error: err.message});
    }
});

module.exports = router;
