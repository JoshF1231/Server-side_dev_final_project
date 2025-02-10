const database = require("../database");
const costs = require("../models/costs");
const mongoose = require('mongoose');
const {Costs} = require("./costs");

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

const Report = mongoose.model('Report', reportSchema);
const categories = ["food", "health", "housing", "sport", "education"];

async function getMonthlyReport(userId, year, month) {
    const result = {
        data: null,
        err: null
    };

    try {
        // Check if the report already exists
        let report  = await Report.findOne({ userid: userId, year, month });

        if (report) {
            result.data = report;
            return result;
        }
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
        result.err = err;
    }
    return result;
}


module.exports = {
    getMonthlyReport
};
