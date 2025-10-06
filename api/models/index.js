import { Sequelize, DataTypes } from "sequelize";
import getUserModel from "./user.js";
import getMessageModel from "./message.js";
import getTarefaModel from "./tarefa.js";

let sequelize;

if (process.env.DB_HOST) {
  
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ?? 5432,
      dialect: "postgres",
      logging: false,
    }
  );
} else {

  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite", 
    logging: false,
  });
}

const models = {
  User: getUserModel(sequelize, { DataTypes }),
  Message: getMessageModel(sequelize, { DataTypes }),
  Tarefa: getTarefaModel(sequelize, { DataTypes }),
};

Object.values(models)
  .filter((m) => typeof m.associate === "function")
  .forEach((m) => m.associate(models));

export { sequelize };
export default models;
