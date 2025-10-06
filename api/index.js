import "dotenv/config";
import express from "express";
import cors from "cors";
import models, { sequelize } from "./models/index.js";
import routes from "./routes/index.js";
import tarefasRoutes from "./routes/tarefas.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    if (eraseDatabaseOnSync) {
      await createInitialData();
    }
    app.listen(port, () => console.log(`Servidor rodando na porta ${port}!`));
  })
  .catch((err) => console.error("Erro ao conectar com o banco:", err));

async function createInitialData() {
  await models.User.create(
    {
      username: "rwieruch",
      email: "rwieruch@email.com",
      messages: [
        { text: "Published the Road to learn React" },
        { text: "Published also the Road to learn Express + PostgreSQL" },
      ],
      tarefas: [
        { titulo: "Primeira tarefa", descricao: "Tarefa de teste" },
        { titulo: "Segunda tarefa", descricao: "Outra tarefa" },
      ],
    },
    {
      include: [
        { model: models.Message, as: "messages" },
        { model: models.Tarefa, as: "tarefas" },
      ],
    }
  );
  console.log("Usuários, mensagens e tarefas criados!");
}

