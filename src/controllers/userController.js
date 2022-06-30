const userModel = require ("../models/user");
const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY= process.env.SECRET_KEY;

const register = async (req, res) => {

  const {username,password,email} = req.body;
  try {
    // checking if user exist
    const existingUser = await userModel.findOne ({email: email});
    if (existingUser) {
      return res.status (400).json ({message: 'User Already Exist!'});
    }

    // generating hashed password
    const hashed_password = await bcrypt.hash(password, 10);

    // creating new user
    const result = await userModel.create ({
      username: username,
      password: hashed_password,
      email: email
    });

    // generating token
    const token = jwt.sign({email: result.email, id: result._id}, SECRET_KEY);

    res.status(201).json({user: result, token: token});
  } catch (error) {
    console.log (error);
    res.status(500).json({message: "Something went wrong!"});
  }
}

const login = async (req, res) => {
    const {email,password} = req.body;

    try{
      const existingUser = await userModel.findOne({email : email});
      if(!existingUser){
        return res.status(404).json({message: "User doesn't exist!"});    
      }

      const userPassword = await bcrypt.compare(password,existingUser.password);
      if(!userPassword){
        return res.status(400).json({message: "Invalid Credentials!"});
      }
      const token = jwt.sign({email: existingUser.email, id : existingUser._id},SECRET_KEY);
      res.status(200).json({user:existingUser, token:token});

    }catch(error){
      console.log (error);
      res.status(500).json({message: "Something went wrong!"});
    }
};

module.exports = {register, login};
