var express = require('express');
var router = express.Router();
const { getMonthlyReport } = require('../models/reports');
const {getMonthlyReportException} = require("../models/exceptions");

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

router.get('/', async function(req, res) {
    try {
        const { id, year, month } = req.query;

        if (!id || !year || !month) {
            return res.status(400).json({ error: "Missing required parameters" });
        }
        const result = await getMonthlyReport(userid, year, month);
        if (result.err) {
            return res.status(400).json({ error: getMonthlyReportException('Failed to retrieve report', result.err.message, req.query) });
        }
        res.json(result.data);
    }
    catch (err) {
        return res.status(500).json({ error: getMonthlyReportException('Unexpected server error', err.message, req.query) });
    }
});

module.exports = router;
