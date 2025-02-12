const express = require('express');
const router = express.Router();
const {addCost} = require('../models/costs');
const {addCostException} = require("../models/exceptions");



/**
 * POST route to add a new cost entry.
 * @route POST /
 * @group Costs - Operations related to cost management
 * @param {Object} req.body - The request body containing cost details
 * @param {string} req.body.description - Description of the expense
 * @param {string} req.body.category - Category of the expense (e.g., food, health, housing, sport, education)
 * @param {string} req.body.userid - User ID associated with the expense
 * @param {number} req.body.sum - The amount spent
 * @param {Date} [req.body.create_date] - The date of the expense (optional, defaults to the request timestamp)
 * @returns {Object} 201 - The newly created cost entry
 * @returns {Object} 400 - Bad request (missing fields)
 * @returns {Object} 500 - Internal server error
 */


router.post('/', async function(req, res, next) {
    try {
        const cost_item = req.body;
        if(!cost_item.description || !cost_item.category || !cost_item.userid || !cost_item.sum) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const firstName = cost_item.first_name || "moshe";
        const lastName = cost_item.last_name || "israeli";
        const newcost = await addCost(cost_item.description, cost_item.category , cost_item.userid , cost_item.sum, cost_item.create_date, firstName,lastName);
        if(newcost.err) {
            return res.status(500).json({ error: addCostException('Failed to add cost', newcost.err.message, cost_item) });
            return;
        }
        res.status(201).json(newcost.data);
    }
    catch(err) {
        return res.status(500).json({ error: addCostException('Unexpected server error', err.message, req.body) });
    }
});

module.exports = router;
