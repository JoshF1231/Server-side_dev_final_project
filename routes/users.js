const express = require('express');
const router = express.Router();
const { getCostsByUserId } = require('../models/costs');

/* GET user costs */
router.get('/:userid', async function(req, res, next) {
  try {
    const userid = req.params.userid;
    const costs = await getCostsByUserId(userid);
    if(costs.err) {
      return res.status(500).json({error: costs.err.message});
    }

    return res.json(costs.data);

  } catch(err) {
    return res.json({error: err.message});
  }
});

module.exports = router;