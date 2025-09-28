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
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});


router.post("/", async (req, res) => {
  try {
    const user = await models.User.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});


router.put("/:userId", async (req, res) => {
  try {
    const user = await models.User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    await user.update(req.body);
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});


router.delete("/:userId", async (req, res) => {
  try {
    const user = await models.User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    await user.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});

export default router;

