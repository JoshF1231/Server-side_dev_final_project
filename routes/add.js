const express = require('express');
const router = express.Router();
const {add_cost} = require('../models/costs');



/* post users listing. */
router.post('/', async function(req, res, next) {
    try {
        const cost_item = req.body;
        if(!cost_item.description || !cost_item.category || !cost_item.userid || !cost_item.sum) {
            return res.status(400).json({error: "all fields are required"});
        }
        const newcost = await add_cost(cost_item.description, cost_item.category , cost_item.userid , cost_item.sum, cost_item.create_date);
        if(newcost.err) {
            res.status(500).json({error: newcost.err.message});
            return;
        }
        res.json(newcost.data);
    }
    catch(err) {
        //console.log(err);
        res.json({error: err});
    }
});

module.exports = router;
