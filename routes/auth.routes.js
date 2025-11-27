const express = require("express");

// CONTROLLERS
const controllers = {
  accounts: require("../controllers/accounts.controllers"),
};

// MIDDLEWARES
const middlewares = {
  auth: require("../middlewares/auth.middlewares"),
  register: require("../middlewares/register.middlewares"),
  login: require("../middlewares/login.middlewares"),
  accounts: require("../middlewares/accounts.middlewares"),
};

const router = express.Router();

router.post(
  "/register",
  middlewares.register.validate,
  middlewares.register.account,
  middlewares.register.create,
  middlewares.auth.code_generate,
  middlewares.auth.user_has_code,
  middlewares.auth.code_send,
  controllers.accounts.create
);

router.post(
  "/register/validation",
  middlewares.register.validation,
  middlewares.auth.code_exist,
  middlewares.auth.code_expired,
  middlewares.auth.code_delete,
  controllers.accounts.validate
);

router.post(
  "/login",
  middlewares.login.validate,
  middlewares.accounts.by_username,
  middlewares.login.authentication,
  middlewares.accounts.verified,
  middlewares.auth.code_generate,
  middlewares.auth.user_has_code,
  middlewares.auth.code_send,
  controllers.accounts.login
);

router.post(
  "/logout",
  controllers.accounts.logout
);

router.post(
  "/refresh",
  middlewares.accounts.refresh,
  controllers.accounts.refresh,
);

router.post(
  "/validate",
  middlewares.accounts.refresh,
  controllers.accounts.validate_session
);

/*
router.post(
  "/login/firebase",
);
*/
router.post(
  "/recovery",
  middlewares.accounts.recovery,
  middlewares.accounts.by_email,
  middlewares.auth.code_generate,
  middlewares.auth.user_has_code,
  middlewares.auth.code_send,
  controllers.accounts.recovery
);

router.post(
  "/recovery/validation",
  middlewares.accounts.recovery_validation,
  middlewares.auth.code_exist,
  middlewares.auth.code_expired,
  middlewares.auth.code_delete,
  controllers.accounts.recovery_password
);

router.post(
  "/code",
  middlewares.auth.code_validation,
  middlewares.accounts.by_email,
  middlewares.auth.code_generate,
  middlewares.auth.user_has_code,
  middlewares.auth.code_send,
  controllers.accounts.code_send
);

router.use(middlewares.auth.protect);

router.patch(
  "/update/email",
  middlewares.accounts.update_email,
  middlewares.auth.code_generate,
  middlewares.auth.user_has_code,
  middlewares.auth.code_send,
  controllers.accounts.update_email
);

router.patch(
  "/update/email/validation",
  middlewares.accounts.update_email_validation,
  middlewares.auth.code_exist,
  middlewares.auth.code_expired,
  middlewares.auth.code_delete,
  controllers.accounts.update_email_validation
);

router.patch(
  "/update/password",
  middlewares.accounts.update_password,
  middlewares.auth.code_generate,
  middlewares.auth.user_has_code,
  middlewares.auth.code_send,
  controllers.accounts.update_password
);

router.patch(
  "/update/password/validation",
  middlewares.accounts.update_password_validation,
  middlewares.auth.code_exist,
  middlewares.auth.code_expired,
  middlewares.auth.code_delete,
  controllers.accounts.update_password_validation
);

module.exports = router;