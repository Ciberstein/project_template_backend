const express = require("express");

// CONTROLLERS
const controllers = {
  accounts: require("../controllers/accounts.controllers"),
};

// MIDDLEWARES
const middlewares = {
  auth: require("../middlewares/auth.middlewares"),
  accounts: require("../middlewares/accounts.middlewares"),
};

const router = express.Router();

router.use(middlewares.auth.protect);

router.get("/",
  controllers.accounts.data
);

module.exports = router;
