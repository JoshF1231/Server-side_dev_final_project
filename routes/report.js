var express = require('express');
var router = express.Router();

var express = require('express');
var router = express.Router();
const { getMonthlyReport } = require('../models/reports');

/**
 * GET route to retrieve the monthly expense report for a user.
 * @route GET /
 * @group Reports - Operations related to expense reports
 * @param {Object} req - The request object
 * @param {Object} req.query - The query parameters
 * @param {string} req.query.userid - The user ID for whom the report is requested
 * @param {number} req.query.year - The year of the report
 * @param {number} req.query.month - The month of the report
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Object} 200 - The requested monthly report
 * @returns {Object} 400 - Bad request (missing parameters or error retrieving report)
 * @returns {Object} 500 - Internal server error
 */

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
