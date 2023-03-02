const {Users,Folower} = require('../../../models')
const {hashdata ,verifyHashedData} = require('../../util/hashdata.js')
const {createToken} = require('../../util/createToken.js')
const multer = require("multer");
const {validateToken} = require('../../../middlewares/validateauth.js')

const authenticateUser = async (data) => {
     try {
          const {email,password} = data;

          const fetchUser = await Users.findOne({where : {email: email}})

          if(!fetchUser) {
               throw Error("Invalid email entered!");
          }
          if(!fetchUser.verified) {
               throw Error("Email hasn't verified yet. check your inbox!")
          }

          const hashedpassword = fetchUser.password;
          const passwordmatch =await verifyHashedData(password,hashedpassword)

          if(!passwordmatch) {
               throw Error("Invalid Password!")
          }

          return fetchUser;
     } catch (error) {
          throw error;
     }
}

const createUser = async (data) => {
     try {
          const {email,password,username} = data;
          // hash Password
          const hashedpassword = await hashdata(password);
          const newUser =await Users.create({username : username , email : email , password : hashedpassword});
          return newUser;

   
     } catch (error) {
          throw error
     }
}
const updateimage = async (data) => {
     try {
          
          const {image , email} = data;
          const newImage = await Users.update({image : image} , {where : {email : email}})
          return newImage

     } catch (error) {
          throw error
     }
}
const updatebgimage = async (data) => {
     try {
          const {bgimage , email} = data;
          const newBgimage = await Users.update({profilebgimage :bgimage } , {where :{ email :email }})
          return newBgimage

     } catch (error) {
          throw error
     }
}

const Profile = async (data) =>{
     try {
          const {UserId} = data
          const getProfile = await Folower.findAll({where : {FollowId : UserId}});

          return getProfile
     } catch (error) {
          throw Error(error)
     }
}

const FollowUser = async (data) => {
     try {
          const {UserId,username,userimage,FollowId} = data;

          const followUsers = await Folower.create({
               username : username ,
               image : userimage ,
               UserId : UserId ,
               FollowId : FollowId
          })
          return followUsers
     } catch (error) {
          throw Error(error)
     }
}

module.exports = {createUser,authenticateUser,updateimage , updatebgimage,Profile,FollowUser }