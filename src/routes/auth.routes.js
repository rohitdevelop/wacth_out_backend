const express = require("express");

const authRouter = express.Router();

const {
  signup,
  login,
  users,
  address,
  deleteUser,
  logoutuser,
  getMe,
} = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware"); // JWT token middleware
const role = require("../middleware/role.middleware");
const registerValidation = require("../validators/auth.validatoer");
const validate = require("../middleware/validator.middleware");

authRouter.post("/signup", registerValidation, validate, signup);
authRouter.post("/login", login);
authRouter.get("/me", authMiddleware, getMe);
authRouter.post("/address", authMiddleware, address);
authRouter.post("/logoutuser", logoutuser);

// its have to delete admin members
authRouter.delete(
  "/delete-user/:id",
  authMiddleware,
  role("admin"),
  deleteUser,
);

authRouter.get("/users", users);

module.exports = authRouter;