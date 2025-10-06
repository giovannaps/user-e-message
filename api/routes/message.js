
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
    if (!message) {
      return res.status(404).json({ error: "Mensagem não encontrada" });
    }
    return res.json(message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { text, userId } = req.body;
    if (!text || !userId) {
      return res.status(400).json({ error: "Campos obrigatórios: text, userId" });
    }

    const message = await models.Message.create({ text, userId });
    return res.status(201).json(message); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar mensagem" });
  }
});


router.put("/:messageId", async (req, res) => {
  try {
    const message = await models.Message.findByPk(req.params.messageId);
    if (!message) {
      return res.status(404).json({ error: "Mensagem não encontrada" });
    }

    const { text } = req.body;
    await message.update({ text });

    return res.json(message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao atualizar mensagem" });
  }
});


router.delete("/:messageId", async (req, res) => {
  try {
    const message = await models.Message.findByPk(req.params.messageId);
    if (!message) {
      return res.status(404).json({ error: "Mensagem não encontrada" });
    }
    await message.destroy();
    return res.sendStatus(204); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao deletar mensagem" });
  }
});

export default router;
