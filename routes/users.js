const express = require('express');
const router = express.Router();
const { getCostsByUserId } = require('../models/costs');
const {getUserById} = require("../models/users");

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
    if (!user){
      return res.status(404).send({error: "User not found"});
    }
    const costs = await getCostsByUserId(userid);
    if(costs.err) {
      return res.status(500).json({error: "Invalid userid"});
    }
    const response = {
      id : user.id,
      first_name : user.first_name,
      last_name : user.last_name,
      costs : costs.data,
    };
    return res.status(200).json(response);
  } catch(err) {
    return res.status(500).json({error: err.message});
  }
});

module.exports = router;
