const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Buyer = require("../models/buyer");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

//Buyer Registration
exports.registerBuyer = async (req, res) => {
  const { email, password } = req.body;
  try {
    const emailAlreadyExists = await Buyer.findOne({ email });

    if (emailAlreadyExists) {
      throw new CustomError.BadRequestError("Email already exists!");
    }
    const user = await Buyer.create({ email, password });
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({ data: tokenUser });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// exports.loginBuyer=async(req, res) => {
//     const {email, password} = req.body;

//     if(!email || !password) {
//         throw new CustomError.BadRequestError("Please provide email and password");
//     }
//     const user=await Buyer.findOne({email})
//     if(!user) throw new CustomError.BadRequestError("")
// }
