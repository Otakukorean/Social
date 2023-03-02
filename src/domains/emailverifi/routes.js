const express  = require('express')
const router = express.Router();
const {sendverificationOtpEMail,verifiyUserEmail} = require('./contoller.js')
//  request new verification otp

router.post('/' , async (req,res) => {
     try {
          const {email} = req.body;
          if(!email) {
               throw Error("An email is required!")
          }
          const createEmailVerificationOPtp=await sendverificationOtpEMail(email);
          res.status(200).json(createEmailVerificationOPtp)
        } catch (error) {
          res.status(400).send(error.message)
     }
})

router.post('/verifiy' , async (req,res) => {
     try {
          let {email,opt} = req.body

          if(!(email && opt)) {
               throw Error("Ivalid Values")
          }
          await verifiyUserEmail({email,opt})
          res.status(200).json({email,verified : true})
     } catch (error) {
          res.status(400).send(error.message)
     }
})


module.exports = router;