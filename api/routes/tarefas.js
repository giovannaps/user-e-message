import { Router } from "express";
import Tarefa from "../models/tarefa.js";

const router = Router();


router.get("/", async (req, res) => {
  try {
    const tarefas = await Tarefa.findAll();
    res.json(tarefas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (!tarefa) return res.status(404).json({ error: "Tarefa não encontrada" });
    res.json(tarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const { descricao, concluida } = req.body;
    const tarefa = await Tarefa.create({ descricao, concluida });
    res.status(201).json(tarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (!tarefa) return res.status(404).json({ error: "Tarefa não encontrada" });

    const { descricao, concluida } = req.body;
    await tarefa.update({ descricao, concluida });
    res.json(tarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (!tarefa) return res.status(404).json({ error: "Tarefa não encontrada" });

    await tarefa.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
