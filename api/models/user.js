const getUserModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { notEmpty: true },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { notEmpty: true, isEmail: true },
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Message, { as: "messages", foreignKey: "userId", onDelete: "CASCADE" });
    User.hasMany(models.Tarefa, { as: "tarefas", foreignKey: "userId", onDelete: "CASCADE" });
  };

  User.findByLogin = async (login) => {
    let user = await User.findOne({ where: { username: login } });
    if (!user) user = await User.findOne({ where: { email: login } });
    return user;
  };

  return User;
};

export default getUserModel;


