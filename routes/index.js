var express = require('express');
var router = express.Router();

/**
 * GET route for the home page.
 * @route GET /
 * @group Home - Main application routes
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {void} Renders the index page with a title
 */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
