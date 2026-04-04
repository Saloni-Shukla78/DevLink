const validator = require("validator");

const validationSignup = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName) {
    throw new Error("First name is required.");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid, Please enter valid email.");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not enougn strong.");
  }
};

module.exports ={validationSignup}
