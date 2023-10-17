module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      senderId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      receiverId: {
        type: DataTypes.STRING,
        allowNull : false
      },
      message : {
        type: DataTypes.STRING,
        allowNull : false
      }
   
      
    
    });
    return User;
  };