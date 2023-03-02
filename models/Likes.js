module.exports = (sequelize , DataTypes) => {
     const Likes = sequelize.define("Likes", {

          count :{
               type : DataTypes.INTEGER ,
               allowNull: false
          } , 
          username : {
              type :  DataTypes.STRING ,
              required: true,
              allowNull: false

          },
          userImage : {
               type :  DataTypes.STRING 
          }
     
     } ,
     {
         charset: 'utf8',
         collate: 'utf8_general_ci', 
       })
 
       Likes.associate = (models) => {
          Likes.belongsTo(models.Posts , {
               onDelete : "cascade"
          })
       }
 
     return Likes
 }