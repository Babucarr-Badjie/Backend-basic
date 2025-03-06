import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

console.log("HELLO BABUCARR");

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
