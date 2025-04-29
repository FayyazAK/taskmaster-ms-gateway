const express = require("express");
const router = express.Router();
const {
  authServiceProxy,
  todoServiceProxy,
  emailServiceProxy,
} = require("../middleware/proxy");
const {
  authenticate,
  authorizeAdmin,
  authorizeSystem,
} = require("../middleware/auth");

router.use("/auth/login", authServiceProxy);
router.use("/auth/signup", authServiceProxy);
router.use("/auth", authenticate, authServiceProxy);
router.use("/emails", authorizeSystem, emailServiceProxy);
router.use("/todo/lists", authenticate, todoServiceProxy);
router.use("/todo/tasks", authenticate, todoServiceProxy);
router.use("/todo/priorities", authenticate, todoServiceProxy);
router.use(
  "/admin/todo/priorities",
  authenticate,
  authorizeAdmin,
  todoServiceProxy
);
router.use("/admin/users", authenticate, authorizeAdmin, authServiceProxy);

module.exports = router;
