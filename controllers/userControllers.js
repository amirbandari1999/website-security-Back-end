import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";



const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

const registerUser = asyncHandler(async (req, res) => {
const {username,email,password} = req.body;

const userExists=await User.findOne({email});

if(userExists){
    res.status(404)
    throw new Error("User Already Exists");
}
const user = await User.create({
    username,
    email,
    password,
    
});
if(user) {
    res.status(201).json({
        _id: user._id,
        username:user.username,
        email:user.email,  
        isAdmin : user.isAdmin,
        token:generateToken(user._id),
    });
}else{
res.status(400)
throw new Error("User not found");
}
});



const updateUserProfile = asyncHandler(async(req, res)=>{
   if(res.locals.userInfo.id) {
    const user = await User.findById(res.locals.userInfo.id);
    console.log(user);
    console.log(req.body)
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
        user.password = req.body.password;
      }
        const updatedUser = await user.save();
    
        res.json({
          _id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(req.body),
        });
   } else {
    res.status(404);
    throw new Error("User Not Found");
  }});

export {registerUser,authUser,updateUserProfile };