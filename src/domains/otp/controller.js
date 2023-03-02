const {Otp} = require('../../../models')
const GenerateOpt = require('../../util/GenerateOpt.js')
const sendMail = require('../../util/SendEmail.js')
const {hashdata ,verifyHashedData} = require('../../util/hashdata.js')
require("dotenv").config();
const {AUTH_EMAIL} = process.env
const sendOtp = async ({email,subject,message,duration = 1 , }) => {
     try {
          if(!(email && subject && message)) {
               throw Error("Provide values for emails ,subject,message")
          }


          // clear old record
          await Otp.destroy({where : {email : email}})

          const generateOtp = await GenerateOpt();


          // send mail
          const mailOptions = {
               from : AUTH_EMAIL ,
               to : email ,
               subject,
               html : `
               <p>${message}</p>
               <p style="color:tomato; font-size:25px; letter-spacing:2px;"><b> ${generateOtp}</b></p>
               <p>This Cpde <b>expires in ${duration} hours</b></p>
               
               `
          }

          await sendMail(mailOptions)

          // save into db
          const hashedOtp = await hashdata(generateOtp);
          const newOtp = await Otp.create({

               email : email ,
               otp : hashedOtp ,
               expiresAt : Date.now() + 3600000 * +duration
          })
          return newOtp;
       
          


     } catch (error) {
          throw error    
     }
}

const verifyOtp = async ({email,opt}) => {
     try {
          if(!(email && opt)) {
               throw Error("Invalid Cordinait")
            }
            const matchedOtp = await Otp.findOne({where : {email : email}})
       
            if(!matchedOtp) {
               throw Error("The Opt Is Not Found");
            }
       
            const {expiresAt} = matchedOtp;
            const {otp} = matchedOtp;
            
            if(expiresAt < Date.now()) {
               await Otp.destroy({where : {email : email}});
               throw Error("The Code Has been Expired!")

            }
            const hashedotp = otp;
            const validOtp = await verifyHashedData(opt , hashedotp);
            return validOtp;

     } catch (error) {
          throw error
     }

}

const deletotp = async (email) => {
     try {
          await Otp.destroy({where : {email : email}})
     } catch (error) {
          throw error
     }
}

module.exports= {sendOtp ,verifyOtp,deletotp}