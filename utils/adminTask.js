const adminTask = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (req.session.role_id != 1) {
      res.redirect("/login");
    } else {
      next();
    }
  };
  
  module.exports = adminTask;