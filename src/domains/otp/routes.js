const express = require('express')
const router = express.Router()
const {sendOtp,verifyOtp,deletotp} = require('./controller.js')
// request new verifiction otp


router.post('/',async (req,res) => {
     try {
          
          const {email,subject,message,duration} = req.body;

          const createOtp = await sendOtp({
               email ,
               subject,
               message,
               duration
          })
          res.status(200).json(createOtp)
     } catch (error) {
     res.status(400).send(error.message)
     }
})

router.post('/verify' , async (req,res) => {
     try {
      let {email,opt} = req.body;
      const validotp = await verifyOtp({email,opt})
      res.status(200).json({valid : validotp})
     } catch (error) {
          res.status(400).send(error.message)
     }
})

module.exports = router