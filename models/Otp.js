module.exports = (sequelize , DataTypes) => {
     const Otp = sequelize.define("Otp", {
          email : {
               type : DataTypes.STRING ,
               unique: true
          } , 
          otp : {
               type : DataTypes.STRING 
          } ,
          expiresAt : {
               type : DataTypes.DATE
          }
 
         
     
     } ,
     {
         charset: 'utf8',
         collate: 'utf8_general_ci', 
       })
 

 
     return Otp
 }