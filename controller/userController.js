const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const  jwt = require("jsonwebtoken");
const SecretKey = "gjvc1155147vuffv";

exports.register = async (req, res)=>{
    try{
        const {name, email, password, role} = req.body;
        const userRole = role && role === 'admin' ? 'admin' : 'user'
        const  hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({email});
        if(existingUser)
            return res.status(400).json({message: "User already exists"});

        const newUser = new User({name, email, password:hashedPassword, role: userRole});
        await newUser.save();
        res.status(201).json({message: `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} registered Successfully`});
    } catch(err){
        res.status(500).json({message: "Error registering user", error: err});
    }
};

exports.login = async (req, res) =>{
    try{
        const  {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: "Invalid email or password"});
        }

        const  isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            return res.status(400).json({message: "Invalid password"});
        }

        const token = jwt.sign({userId : user._id, role: user.role}, SecretKey, {expiresIn:"1hr"});
        res.status(200).json({token, role: user.role, message: "User logged in successfully"});
    }catch (err){
        res.status(500).json({message:"Error in logged in", error:err});
    }
};

// Get user profile (protected route)
exports.getUserProfile = async (req, res) => {
    try {
      const userId = req.user.userId; // userId from the decoded JWT token
      const user = await User.findById(userId).select('-password');
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user profile", error });
    }
  };