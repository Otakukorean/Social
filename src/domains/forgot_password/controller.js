const {Users} = require('../../../models')
const {sendOtp ,verifyOtp ,deletotp} = require('../otp/controller.js')
const {hashdata ,verifyHashedData} = require('../../util/hashdata.js')

const sendPasswordResetOTPEmail = async (email) => {
     try {
          // check if an account exists
          const existingUser = await Users.findOne({where:{email : email}});
          if(!existingUser) {
               throw Error("The Account is not found!")
          }

          if(!existingUser.verified) {
               throw Error("Verified Your Account Please!")
          }

          const otpDetails = {
               email ,
               subject : "Password Reset" ,
               message : "Enter Te code below to reset your password" ,
               duration : 1
          }
          const createOTP=await sendOtp(otpDetails)
          return createOTP;
     } catch (error) {
          throw error
     }
}   

const resetPassword =async ({email , opt,newPassword}) => {
     try {
          const validOTP = await verifyOtp({email , opt});
          if(!validOTP){
               throw Error("Invalid code passed. Check Your Inbox");
          }

          // update user recorde with new password

          if(newPassword.length < 8) {
               throw Error("The Password is Too Short")
          }
          const hashedNewPassword = await hashdata(newPassword)
          const updateUserPassword = await Users.update({password :hashedNewPassword } , {where : {email : email}})
          return updateUserPassword;
     } catch (error) {
          throw error
     }
}





module.exports ={sendPasswordResetOTPEmail,resetPassword}