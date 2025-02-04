var express = require('express');
var router = express.Router();
const {get_monthly_report} = require('../models/reports');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    try {
        const { userid, year, month } = req.query;

        if (!userid || !year || !month) {
            return res.status(400).json({ error: "Missing required parameters" });
        }
        const result = await get_monthly_report(userid, year, month);
        if (result.err) {
            return res.status(400).json({ error: result.err.message });
        }
        res.json(result.data);
    }
    catch (err) {
        return res.status(500).json({error: err.message});}
});

module.exports = router;
