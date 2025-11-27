// MODELS
const Accounts = require("../models/accounts.models");

// UTILS
const { isFirstLetterUpperCase, containsSpecialCharacters } = require("../utils/validators.util");
const hash = require("../utils/hash.util");
const AppError = require("../utils/app.error.util");
const catchAsync = require("../utils/catchAsync.util");
const app_config = require("../utils/app.config.util");


exports.validate = catchAsync(async (req, _, next) => {
  const { username, email, password } = req.body;

  const status = await app_config('register_status');

  if(status === false) {
    return next(new AppError(`Register is not avalable in this moment`, 406));
  }

  if(!username) {
    return next(new AppError(`Username cannot be empty`, 406));
  }

  if(!email) {
    return next(new AppError(`Email cannot be empty`, 406));
  }

  if(!password) {
    return next(new AppError(`Password cannot be empty`, 406));
  }

  if(password.length < 8) {
    return next(new AppError(`The password must have at least 8 characters`, 406));
  }
  
  next();
});

exports.validation = catchAsync(async (req, _, next) => {
  const { accountId, code } = req.body;

  if(!accountId) {
    return next(new AppError(`Account ID is required`, 406));
  }

  if(!Number.isInteger(Number(accountId))) {
    return next(new AppError(`Account ID must be a valid integer`, 406));
  }

  if(!code) {
    return next(new AppError(`Security Code is required`, 406));
  }

  if(!Number.isInteger(Number(code))) {
    return next(new AppError(`Security Code must be a valid integer`, 406));
  }

  next();
});

exports.account = catchAsync(async (req, _, next) => {
  const { username, email, password, password_repeat } = req.body;

  let web_name;

  const [acc_name, acc_email] = await Promise.all([
    Accounts.Account.findOne({ where: { name: username }}),
    Accounts.Account.findOne({ where: { email: email.toLowerCase() }}),
  ]);

  if (acc_name) {
    return next(new AppError("This username already registered", 406));
  }

  if (acc_email) {
    return next(new AppError("This email already registered", 406));
  }

  if (password !== password_repeat) {
    return next(new AppError("Passwords do not match", 406));
  }

  if (!isFirstLetterUpperCase(username)) {
    return next(new AppError("The first letter of username must be uppercase", 406));
  }

  if (!containsSpecialCharacters(username)) {
    return next(new AppError("No special characters or blank spaces are allowed in username", 406));
  }

  req.web_name = web_name;

  next();
});

exports.create = catchAsync(async (req, res, next) => {
  const { username, email, password, email_verified = false } = req.body;

  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
   
  const account = await Accounts.Account.create({
      authority: email_verified ? 0 : -1,
      ip,
      username: username.trim(),
      password: hash(password),
      email: email.toLowerCase(),
  });

  if (!account) {
    next(new AppError("Error on register", 500));
  }

  if (email_verified) {
    return res.status(201).json({
      status: "success",
      message: "Account has been created",
      account: {
        id: account.id,
        username: account.username,
        email: account.email,
      },
    });
  }

  req.account = account;

  next();
});
