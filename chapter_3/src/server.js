// modern importing syntax
import express from "express";

const app = express();

const PORT = process.env.PORT || 5000;

console.log("Hello World")

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
