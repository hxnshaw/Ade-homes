const CustomError = require("../errors");
const { isValidToken } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnauthenticatedError("INVALID AUTHENTICATION");
  }

  try {
    const { first_name, last_name, userId, role, email, phone_number } =
      isValidToken({
        token,
      });
    req.user = {
      first_name,
      last_name,
      userId,
      role,
      email,
      phone_number,
    };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("INVALID AUTHENTICATION");
    //res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message });
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "UNAUTHORIZED TO ACCESS THIS ROUTE."
      );
    }
    next();
  };
};


module.exports = {
  authenticateUser,
  authorizePermissions,
};
