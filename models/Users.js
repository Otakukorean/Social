module.exports = (sequelize , DataTypes) => {
     const Users = sequelize.define("Users", {
          username : {
               type : DataTypes.STRING ,
               unique: true ,
               required: true
          } ,
          email : {
               type : DataTypes.STRING ,
               unique: true ,
               required: true
          },
          password : {
               type : DataTypes.STRING ,
               required: true
          } ,
          verified : {
               type : DataTypes.BOOLEAN ,
               defaultValue: false
          } ,
          image : {
               type : DataTypes.STRING
          } ,
          profilebgimage : {
               type : DataTypes.STRING
          } ,
          isAdmin : {
               type : DataTypes.BOOLEAN ,
               defaultValue: false
          } ,
          isCeo : {
               type : DataTypes.BOOLEAN ,
               defaultValue: false
          }
     
 
         
     
     } ,
     {
         charset: 'utf8',
         collate: 'utf8_general_ci', 
       })
       Users.associate = (models) => {
          Users.hasMany(models.Posts , {
               onDelete : "cascade"
          })
          Users.hasMany(models.Likes , {
               onDelete : "cascade"
          })
          Users.hasMany(models.PostComments , {
               onDelete : "cascade"
          })
          Users.belongsToMany(models.Users, {
                through: 'Folower', as: 'Follows', foreignKey: 'UserId' 
             })
          Users.belongsToMany(models.Users, {
               through: 'Folower', as: 'Followed', foreignKey: 'FollowId' 
           })
       }
 

 
     return Users
 }