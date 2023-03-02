module.exports = (sequelize , DataTypes) => {
     const Folower = sequelize.define("Folower", {
          id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement: true
             },
          username : {
               type : DataTypes.STRING ,
               required: true ,
               allowNull: false
          } ,
          image : {
               type : DataTypes.STRING 
          }
     
 
         
     
     } ,
     {
         charset: 'utf8',
         collate: 'utf8_general_ci', 
       })


   
       Folower.associate = (models) => {
          Folower.belongsTo(models.Users , {
               onDelete : "cascade"
          })
       }

 
     return Folower
 }