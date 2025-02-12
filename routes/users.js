const express = require('express');
const router = express.Router();
const { getCostsByUserId } = require('../models/costs');
const {getUserById} = require("../models/users");
const {getUserException, getCostsException} = require("../models/exceptions");

/**
 * GET route to retrieve all costs for a specific user.
 * @route GET /:userid
 * @group Costs - Operations related to user expenses
 * @param {Object} req - The request object
 * @param {Object} req.params - The URL parameters
 * @param {string} req.params.userid - The user ID for whom the costs are retrieved
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Object} 200 - List of costs for the specified user
 * @returns {Object} 500 - Internal server error (invalid user ID or system error)
 */

router.get('/:userid', async function(req, res, next) {
  try {
    const userid = req.params.userid;
    const user = await getUserById(userid);
    if (!user.data){
      return res.status(404).json(getUserException("User not found", "No user data returned from database", { userid }));
    }
    const costs = await getCostsByUserId(userid);
    if(costs.err) {
      return res.status(500).json(getCostsException("Failed to retrieve costs", costs.err.message, { userid }));
    }
    let totalCost = 0;
    if (costs.data && Array.isArray(costs.data)) {
      totalCost = costs.data.reduce((sum, cost) => sum + cost.sum, 0);
    }
    const response = {
      id : user.data.id,
      first_name : user.data.first_name,
      last_name : user.data.last_name,
      total : totalCost,
      costs : costs.data,
    };
    return res.status(200).json(response);
  } catch(err) {
    return res.status(500).json(getUserException("Unexpected server error", err.message, { userid: req.params.userid }));
  }
});

module.exports = router;
