import { Sequelize } from "sequelize";
import getUserModel from "./user.js";
import getMessageModel from "./message.js";
import getTarefaModel from "./tarefa.js";

let sequelize;

if (process.env.POSTGRES_URL) {
  
  sequelize = new Sequelize(process.env.POSTGRES_URL, { logging: false });
} else {
 
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "postgres",
      logging: false,
    }
  );
}

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

