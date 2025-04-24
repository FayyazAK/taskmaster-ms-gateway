const express = require("express");
const router = express.Router();
const {
  authServiceProxy,
  todoServiceProxy,
  emailServiceProxy,
} = require("../middleware/proxy");
const { authenticate, authorizeAdmin } = require("../middleware/auth");
// Public routes
router.use("/auth/login", authServiceProxy);
router.use("/auth/signup", authServiceProxy);

// Auth routes - require token
router.use("/auth", authenticate, authServiceProxy);

// Admin routes - require token and admin role
router.use("/admin", authenticate, authorizeAdmin, (req, res, next) => {
  // Route to appropriate service based on the path
  if (req.path.startsWith("/users")) {
    return authServiceProxy(req, res, next);
  } else if (req.path.startsWith("/todos")) {
    return todoServiceProxy(req, res, next);
  } else if (req.path.startsWith("/emails")) {
    return emailServiceProxy(req, res, next);
  } else {
    return res.error(
      "Not Found - The requested admin resource does not exist",
      404
    );
  }
});

module.exports = router;
