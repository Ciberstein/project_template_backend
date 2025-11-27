// UTILS //
const AppError = require("../utils/app.error.util");
const catchAsync = require("../utils/catchAsync.util");
const hash = require("../utils/hash.util");


exports.validate = catchAsync(async (req, _, next) => {
  const { username, password } = req.body;

  if(!username) {
    return next(new AppError(`Username cannot be empty`, 406));
  }

  if(!password) {
    return next(new AppError(`Password cannot be empty`, 406));
  }

  next();
});

exports.authentication = catchAsync(async (req, _, next) => {
  const { password } = req.body;
  const { account } = req;

  if(hash(password) !== account.password) {
    return next(new AppError(`Authentication error`, 406));
  }

  next();
});