import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

// Register a new user endpoint (/auth/register)
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  //   encrypt the password
  const hashedPassword = bcrypt.hashSync(password, 8);

  //   save the new user and hashed password to the db (database)
  try {
    const insertUser = db.prepare(
      `INSERT INTO users (username, password) VALUES (?, ?)`
    );
    const result = insertUser.run(username, hashedPassword);

    // Add default todo for the user
    const defaultTodo = `Hello! Add your first todo`;
    const insertTodo = db.prepare(
      `INSERT INTO todos (user_id, task) VALUES (?, ?)`
    );

    insertTodo.run(result.lastInsertRowid, defaultTodo);
    const bax = res.send("hello");

    // create a token
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  try {
    const getUser = db.prepare("SELECT * FROM users WHERE username = ?");
    const user = getUser.get(username);

    // check if the user is not associated with that username
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    // Checked if the password doesn't match
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    // successful authentication
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    console.log(err);
    res.sendStatus(503);
  }
});

export default router;
