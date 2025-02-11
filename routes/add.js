const express = require('express');
const router = express.Router();
const {addCost} = require('../models/costs');



/* post users listing. */
router.post('/', async function(req, res, next) {
    try {
        const cost_item = req.body;
        if(!cost_item.description || !cost_item.category || !cost_item.userid || !cost_item.sum) {
            return res.status(400).json({error: "all fields are required"});
        }
        const newcost = await addCost(cost_item.description, cost_item.category , cost_item.userid , cost_item.sum, cost_item.create_date);
        if(newcost.err) {
            res.status(500).json({error: newcost.err.message});
            return;
        }
        res.status(201).json(newcost.data);
    }
    catch(err) {
        res.status(500).json({error: err});
    }
});

module.exports = router;
