import { Router } from "express";
import models from "../models/index.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await models.User.findAll();
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});


router.get("/:userId", async (req, res) => {
  try {
    const user = await models.User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(400).json({ error: "Campos obrigatórios: username, email" });
    }

    const user = await models.User.create({ username, email });
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar usuário" });
  }
});


router.put("/:userId", async (req, res) => {
  try {
    const user = await models.User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const { username, email } = req.body;
    await user.update({ username, email });

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});


router.delete("/:userId", async (req, res) => {
  try {
    const user = await models.User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    await user.destroy();
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao deletar usuário" });
  }
});

export default router;

