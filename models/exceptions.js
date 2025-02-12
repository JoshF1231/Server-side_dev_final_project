/**
 * Creates a custom exception for cost-related operations.
 * @param {string} message - The main error message.
 * @param {string} errorDetail - Additional error details.
 * @param {Object} requestData - The data that was passed when the error occurred.
 * @returns {Object} - A formatted error object.
 */
function addCostException(message, errorDetail, requestData) {
    return {
        error: message,
        detail: errorDetail,
        request: requestData
    };
}


/**
 * Creates a custom exception for retrieving costs.
 */
function getCostsException(message, errorDetail, requestData) {
    return {
        error: message,
        detail: errorDetail,
        request: requestData
    };
}

/**
 * Creates a custom exception for retrieving monthly reports.
 */
function getMonthlyReportException(message, errorDetail, requestData) {
    return {
        error: message,
        detail: errorDetail,
        request: requestData
    };
}

/**
 * Creates a custom exception for retrieving user data.
 */
function getUserException(message, errorDetail, requestData) {
    return {
        error: message,
        detail: errorDetail,
        request: requestData
    };
}

/**
 * Creates a custom exception for retrieving developers.
 */
function getDevelopersException(message, errorDetail) {
    return {
        error: message,
        detail: errorDetail
    };
}

module.exports = { addCostException ,getCostsException, getMonthlyReportException, getUserException, getDevelopersException};
