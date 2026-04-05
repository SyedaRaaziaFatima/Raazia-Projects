/**
 * API Utilities and Helpers
 * Reusable functions for API routes
 */

/**
 * Set standard CORS headers on response
 */
export function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
}

/**
 * Handle OPTIONS pre-flight requests
 */
export function handleOptions(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
}

/**
 * Send JSON response with standard format
 */
export function sendResponse(res, statusCode, data) {
  return res.status(statusCode).json({
    ...data,
    timestamp: new Date().toISOString()
  });
}

/**
 * Send error response
 */
export function sendError(res, statusCode, error, message) {
  return res.status(statusCode).json({
    success: false,
    error,
    message,
    timestamp: new Date().toISOString()
  });
}

/**
 * Validate required fields in request body
 */
export function validateRequired(body, fields) {
  const errors = [];
  for (const field of fields) {
    if (!body[field] || (typeof body[field] === 'string' && body[field].trim() === '')) {
      errors.push(`${field} is required`);
    }
  }
  return errors;
}

/**
 * Validate task status
 */
export function isValidStatus(status) {
  return ['pending', 'in-progress', 'completed'].includes(status);
}

/**
 * Check if HTTP method is allowed
 */
export function isMethodAllowed(req, allowedMethods) {
  return allowedMethods.includes(req.method);
}
