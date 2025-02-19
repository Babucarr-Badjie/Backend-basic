import express from "express";
import db from "../db.js";

const router = express.Router();

// Get all todos for all logged-in users
router.get("/", (req, res) => {
  const getTodos = db.prepare("SELECT * FROM todos WHERE user_id = ?");
  const todos = getTodos.all(res.userId);
  res.json(todos);
});

// Create a new todo
router.post("/", (req, res) => {});

// Update a todo
router.put("/:id", (req, res) => {});

// Delete a todo
router.put("/:id", (req, res) => {});

export default router;
