module.exports = (sequelize , DataTypes) => {
     const Postimages = sequelize.define("Postimages", {
          imagesrc : {
               type : DataTypes.STRING ,
               required: true ,
               allowNull: false
          } 
     
 
         
     
     } ,
     {
         charset: 'utf8',
         collate: 'utf8_general_ci', 
       })
   
       Postimages.associate = (models) => {
          Postimages.belongsTo(models.Posts , {
               onDelete : "cascade"
          })
       }
 

 
     return Postimages
 }