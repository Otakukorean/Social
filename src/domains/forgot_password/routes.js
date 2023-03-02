const express = require('express')
const router = express.Router()
const {sendPasswordResetOTPEmail,resetPassword} =require('./controller.js')
// password reset request

router.post('/',async (req,res) => {
     try {
          const {email} = req.body;
          if(!email) {
               throw Error("An Email is required!");
          }
          const createdPasswordResetOTP = await sendPasswordResetOTPEmail(email);
          res.status(200).json(createdPasswordResetOTP)

     } catch (error) {
          res.status(400).send(error.message)
     }
})

router.post('/verify' , async (req,res) => {
     try {
          let {email,opt,newPassword} = req.body; 
          if(!(email && opt &&newPassword)) {
               throw Error("Empty credentials are not allowed!")
          }
          await resetPassword({email , opt , newPassword})
          res.status(200).json({email , passwordReset : true})
     } catch (error) {
          res.status(400).send(error.message)
     }
})


module.exports = router