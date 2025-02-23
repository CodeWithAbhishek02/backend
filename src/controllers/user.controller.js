import {asyncHandler} from '../utils/asyncHandler.js'
import  {ApiError} from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import {User} from '../models/user.model.js'
import {uploadonCloudinary} from '../utils/cloudinary.js'

const registerUser = asyncHandler( async(req,res)=>{
   // get user details from frontend
   // validation - not empty
   // check if user already exit: email,usernme
   // check for images anf avatar
   // upload them to cloudinary
   // create user object - create db entry in db
   // remove pass and refresh token field from response
   // check for user creation 
   // return response
   const {fullname, email, username, password } = req.body
   console.log("Email" , email)

   if ([fullname, email,username,password].some((field)=> field?.trim() === "")){
    throw new ApiError(400, "All fields are required")
   }

   const exitstedUser = User.find({
      $or: [{username},{email}]
   })
   if(exitstedUser){
      throw new ApiError(409, "User Already exist")
   }

   const avatarLocalPath = req.files?.avatar[0]?.path
   const CoverImageLocalPath = req.files?.coverImage[0]?.path

   if(!avatarLocalPath){
      throw new ApiError(400, "Avatar is required")
   }
   
   const avatar = await uploadonCloudinary(avatarLocalPath)
   const CoverImage = await uploadonCloudinary(CoverImageLocalPath)

   if(!avatar){
      throw new ApiError(400, "Avatar is required")
   }

   const user = await User.create({
      fullname,
      avatar: avatar.url,
      coverImage: coverImage?.url || '',
      email,
      password,
      username: username.toLowerCase()
   })
   const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
   )
   
   if(!createdUser){
      throw new ApiError(500, "something went wrong while registering the user")
   }

   return res.status(201).json(
      new ApiResponse(200, createdUser, "user registered successfully")
   )
}) 

export {registerUser}