const mongoose = require('mongoose');
const {Costs} = require("./costs");
const {getMonthlyReportException} = require("./exceptions");

/**
 * Schema for monthly expense reports.
 */

const reportSchema = new mongoose.Schema({
    userid: String,
    year: Number,
    month: Number,
    costs: [{
        _id: false,
        category: String,
        items: [{
            _id: false,
            sum: Number,
            description: String,
            day: Number
        }]
    }]
}, { timestamps: true });

/**
 * Mongoose model for the "Report" collection.
 */

const Report = mongoose.model('Report', reportSchema);

/**
 * List of supported expense categories.
 * @type {string[]}
 */

const categories = ["food", "health", "housing", "sport", "education"];

/**
 * Retrieves the monthly expense report for a given user and month.
 * If the report does not exist, it generates and stores a new report.
 * @param {string} userId - The ID of the user.
 * @param {number} year - The year of the report.
 * @param {number} month - The month of the report.
 * @returns {Promise<{data: object|null, err: Error|null}>} 
 * An object containing the report data or an error.
 */

async function getMonthlyReport(userId, year, month) {
    const result = {
        data: null,
        err: null
    };

    try {
        // If not, generate a new report
        const startDate = new Date(year, month-1 , 1);
        const endDate = new Date(year, month, 1);
        endDate.setMilliseconds(-1);

        const cost = await Costs.find({
            userid: userId,
            create_date: { $gte: startDate, $lte: endDate }
        });

        const categorizedCosts = {};
        categories.forEach((category) => {
            categorizedCosts[category] = [];
        })
        cost.forEach(cost => {
            if (categorizedCosts[cost.category]) {
                categorizedCosts[cost.category].push({
                    sum: cost.sum,
                    description: cost.description,
                    day: cost.create_date.getDate()
                });
            }
        });
        report = new Report({
            userid: userId,
            year,
            month,
            costs: Object.entries(categorizedCosts).map(([category, items]) => ({ category, items }))
        });
        await report.save();
        result.data = report;
    } catch (err) {
        result.err = getMonthlyReportException('Failed to retrieve monthly report', err.message, { userId, year, month });
    }
    return result;
}


module.exports = {
    getMonthlyReport
};
