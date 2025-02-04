var express = require('express');
var router = express.Router();
const {getMonthlyReport} = require('../models/reports');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    try {
        const { userid, year, month } = req.query;

        if (!userid || !year || !month) {
            return res.status(400).json({ error: "Missing required parameters" });
        }
        const result = await getMonthlyReport(userid, year, month);
        if (result.err) {
            return res.status(400).json({ error: result.err.message });
        }
        res.json(result.data);
    }
    catch (err) {
        return res.status(500).json({error: err.message});}
});

module.exports = router;
