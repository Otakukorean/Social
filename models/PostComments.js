module.exports = (sequelize , DataTypes) => {
     const PostComments = sequelize.define("PostComments", {

          username :{
               type : DataTypes.STRING ,
               required: true ,
               allowNull: false
          } ,
          UserImage :{
               type : DataTypes.STRING
          },
          body : { 
               type : DataTypes.STRING,
               required: true ,
               allowNull: false
          }
     
     } ,
     {
         charset: 'utf8',
         collate: 'utf8_general_ci', 
       })

       PostComments.associate = (models) => {
          PostComments.belongsTo(models.Posts , {
               onDelete : "cascade"
          })
       }
 
 
     return PostComments
 }