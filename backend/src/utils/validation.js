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

const validationEditProfile =(req)=>{
  const allowedFields =["firstName","lastName","headline","age","gender","skills","photoUrl","about"];
  //check all allowed field in array..
  const isAllowedField=Object.keys(req.body).every((field)=> allowedFields.includes(field),
);
  if(!isAllowedField){
    throw new Error("Invalid Updates.");
  }
}

module.exports ={validationSignup, validationEditProfile}
