import { Router } from "express";
import models from "../models/index.js";

const router = Router();


router.get("/", async (req, res) => {
  try {
    const messages = await models.Message.findAll();
    return res.json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});


router.get("/:messageId", async (req, res) => {
  try {
    const message = await models.Message.findByPk(req.params.messageId);
    if (!message) return res.status(404).json({ error: "Mensagem não encontrada" });
    return res.json(message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});


router.post("/", async (req, res) => {
  try {
    
    const message = await models.Message.create({
      text: req.body.text,
      userId: req.body.userId, 
    });
    return res.status(201).json(message); // 201 CREATED
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});


router.delete("/:messageId", async (req, res) => {
  try {
    const message = await models.Message.findByPk(req.params.messageId);
    if (!message) return res.status(404).json({ error: "Mensagem não encontrada" });
    await message.destroy();
    return res.status(204).send(); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});

export default router;

