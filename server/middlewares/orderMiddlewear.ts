
export const authMiddleware = (req, res, next) => {
    // Check if the user is authenticated (e.g., by validating a token)
    // You can use any authentication method that suits your application
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    // User is authenticated, proceed to the next middleware/controller
    next();
  };
  
  export default authMiddleware
  