const express = require('express')

const {Users} = require('../../../models')
const router = express.Router();
require("dotenv").config();
const {createUser,authenticateUser , updateimage , updatebgimage,Profile,FollowUser} = require('./controller.js')
const {createToken} = require('../../util/createToken.js')
const {sendverificationOtpEMail} = require('./../emailverifi/contoller.js')
const {validateToken ,verifyTokenAndAdmin } = require('./../../../middlewares/validateauth.js')
const {Profileimageupload , Profilebgimageupload , postimageupload} = require('../../util/uploadimage.js')
// Sign in

router.post('/login',async (req,res) => {
     try {
          let {email,password} = req.body;
          email = email.trim()
          password = password.trim()

          if(!(email && password)) {
               throw Error("Empty credentials supplied!")
          }
          const authuser =await authenticateUser({email,password})
          const tokenData = {userId :authuser.id,email :authuser.email , username :authuser.username , image : authuser.image ,profilebgimage : authuser.profilebgimage ,isAdmin :authuser.isAdmn , isCeo : authuser.isCeo  }
          const accessToken = await createToken(tokenData);
          res.cookie("token",accessToken, {
               httpOnly : true,
               maxAge : 24 * 60 * 60 * 1000
             })
          res.status(200).json(authuser);
      
     } catch (error) {
        res.status(400).json(error.message)
     }
})

// Signup
router.post('/signup' , async (req,res) => {
     try {
        let {username ,email,password} = req.body;
        const checkifusernameexist = await Users.findOne({where : {username : username}})
        if(checkifusernameexist) {
          return res.json({error : "The Username Is Already Exist Try Another Username Please!"})
        }
        const checkifemailexist = await Users.findOne({where : {email : email}})
        if(checkifemailexist) {
          return res.json({error : "The Email Is Already Exist Try Another Email Please!"})
        }
        username = username.toLowerCase();
        email = email.trim()
        password = password.trim()
          if(!(username && email && password) ) {
            return res.json({error : "Invalid inputs fields!"}) 
          } 
          else if(!/^[a-zA-Z0-9]*$/.test(username)) {
          return res.json({error : "Invalid username entered!"}) 
          }
          else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
               return res.json({error : "Invalid email entered!"}) 
          }
          else if(password.length < 8) {
               return res.json({error :"Password Is Too Short"}) 
          }
          else if(password.length > 255) {
               return res.json({error :"Password Is Too Long"}) 
          }
          else {
               const newUser = createUser({
                    username,
                    email,
                    password  })  
               await sendverificationOtpEMail(email)
               res.status(200).json(newUser)
          }

        
     } catch (error) {
          res.status(400).send(error.message)
     }
})

router.put('/profileimage' , Profileimageupload,validateToken , async (req,res) => {
     try {
          
          const image = req.file.filename
          const email = req.user.email
          const newImage = await updateimage({image ,email})
          res.status(200).json(newImage)

     } catch (error) {
          res.status(400).json(error.message)
     }
})
router.put('/profilebgimage' ,Profilebgimageupload, validateToken , async (req,res) => {
     try {

       const bgimage = req.file.filename;
       const email = req.user.email;
       const newbgimage = await updatebgimage({bgimage , email})
       res.status(200).json(newbgimage)
     } catch (error) {
               res.json(error.message)
     }
})


router.get('/auth' , validateToken , async(req,res) => {
     try {
          res.json(req.user) 
     } catch (error) {
          res.json(error.message)
     }
     
});

router.get('/followers' , validateToken,async (req,res) => {
     try {
          let UserId =req.user.userId;

          const getProfile = await Profile({UserId})
          res.status(200).json(getProfile)
     } catch (error) {
          res.status(400).json(error.message)
     }
})

router.post('/follow' , validateToken , async (req,res) => {
     try {
          let UserId =req.user.userId;
          let username=req.user.username;
          let userimage = req.user.image;
          let FollowId= req.body.FollowId;

          const Follow =await FollowUser({username,userimage,UserId,FollowId});

          res.status(200).json(Follow)
     } catch (error) {
          res.status(400).json(error.message)
     }
})
// router.post('/upload', function (req, res) {

//      postimageupload(req, res, function (err) {
 
//          if (err) {
//              return res.status(400).send({ message: err.message })
//          }
 
//          // Everything went fine.
//          res.status(200).json("done")
//      })
//  })
module.exports = router