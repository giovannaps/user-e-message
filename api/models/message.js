

const getMessageModel = (sequelize, { DataTypes }) => {
  const Message = sequelize.define(
    "Message",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "messages",
      timestamps: true,
    }
  );

  
  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user", 
    });
  };

  return Message;
};

export default getMessageModel;
