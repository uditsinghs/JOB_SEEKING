import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(402).json({
      message: "unauthorized user",
      success: false,
    });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(402).json({
        message: "unauthorized user",
        success: false,
      });
    }
    req.id = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error in validating user",
      success: false,
      error: error.message,
    });
  }
};
