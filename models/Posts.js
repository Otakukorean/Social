module.exports = (sequelize , DataTypes) => {
     const Posts = sequelize.define("Posts", {
          username : {
               type : DataTypes.STRING ,
               required: true ,
               allowNull: false
          } ,
          title : {
               type : DataTypes.STRING ,
               required: true ,
               allowNull: false
          },
          body : {
               type : DataTypes.TEXT('long') ,
               required: true ,
               allowNull: false
          }
     
 
         
     
     } ,
     {
         charset: 'utf8',
         collate: 'utf8_general_ci', 
       })
   
       Posts.associate = (models) => {
          Posts.hasMany(models.Postimages , {
               onDelete : "cascade"
          })
          Posts.hasMany(models.Likes , {
               onDelete : "cascade"
          })
          Posts.hasMany(models.PostComments , {
               onDelete : "cascade"
          })
       }

 
     return Posts
 }