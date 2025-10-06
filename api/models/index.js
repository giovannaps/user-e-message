import { Sequelize } from "sequelize";
import getUserModel from "./user.js";
import getMessageModel from "./message.js";
import getTarefaModel from "./tarefa.js";

const sequelize = new Sequelize(process.env.POSTGRES_URL, { logging: false });

const models = {
  User: getUserModel(sequelize, Sequelize),
  Message: getMessageModel(sequelize, Sequelize),
  Tarefa: getTarefaModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;




