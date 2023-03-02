const {Users} = require('../../../models')
const {sendOtp ,verifyOtp ,deletotp} = require('../otp/controller.js')

const sendverificationOtpEMail = async (email) => {
     try {
          setTimeout(async () => {
               const exiestuser = await Users.findOne({where : {email : email}});
               if(!exiestuser) {
                  throw Error("The User Is Not Found!")
               } 
               
               const otpDetials = {
                  email ,
                  subject : "Email Verification" ,
                  message : "Verifi your email with the code bellow." ,
                  duration : 1
               }
               const createOTP = await sendOtp(otpDetials);
               return createOTP
          },2000)
     
     } catch (error) {
          throw error
     }
}
const verifiyUserEmail = async ({email , opt}) => {
     try {
        const validOTP = await  verifyOtp({email,opt}) 
        if(!validOTP) {
          throw Error("Invalid code passed Check Your In box please!");
        }
     //     now update user recorde to show verified
          await Users.update({verified : true} ,{where : {email : email}} , )
        await deletotp(email)

        return;
     } catch (error) {
          throw error
     }
}

module.exports = {sendverificationOtpEMail ,verifiyUserEmail}