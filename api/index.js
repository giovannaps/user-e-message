import "dotenv/config";
import express from "express";
import cors from "cors";

import models, { sequelize } from "./models/index.js";
import routes from "./routes/index.js";
import tarefasRoutes from "./routes/tarefas.js";

const app = express();
const port = process.env.PORT ?? 3000;

const corsOptions = {
  origin: ["http://example.com", "*"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});


app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByPk(1), 
  };
  next();
});

app.use("/", routes.root);
app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);
app.use("/tarefas", tarefasRoutes);


const eraseDatabaseOnSync =
  process.env.ERASE_DATABASE === "true" && process.env.NODE_ENV !== "production";

sequelize
  .sync({ force: eraseDatabaseOnSync })
  .then(async () => {
    console.log("Banco sincronizado!");

    if (eraseDatabaseOnSync) {
      await createUsersWithMessages();
    }

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}!`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar com o banco:", error);
  });


// Função para criar dados iniciais
// =======================
const createUsersWithMessages = async () => {
  try {
    await models.User.create(
      {
        username: "rwieruch",
        email: "rwieruch@email.com",
        messages: [
          { text: "Published the Road to learn React" },
          { text: "Published also the Road to learn Express + PostgreSQL" },
        ],
      },
      { include: [{ model: models.Message, as: "messages" }] }
    );

    await sequelize.sync({ alter: true });
    console.log("Tabela Tarefa sincronizada!");
    console.log("Usuários e mensagens criados!");
  } catch (error) {
    console.error("Erro ao criar dados iniciais:", error);
  }
};
