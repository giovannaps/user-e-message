const getTarefaModel = (sequelize, { DataTypes }) => {
  const Tarefa = sequelize.define(
    "Tarefa",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      concluida: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "tarefas",
      timestamps: true,
    }
  );

  Tarefa.associate = (models) => {
    Tarefa.belongsTo(models.User, { as: "user", foreignKey: "userId" });
  };

  return Tarefa;
};

export default getTarefaModel;

