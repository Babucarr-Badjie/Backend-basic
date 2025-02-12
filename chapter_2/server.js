const express = require("express");
const app = express();
const PORT = 8383;

let data = ["Babucarr"];

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <body style= "background:pink; color: blue">
      <h1>DATA</h1>
      <p>${JSON.stringify(data)}</p>
      <a href="/dashboard">Dashboard</a>
    </body>
    `);
});

app.get("/dashboard", (req, res) => {
  res.send(`
    <body>
      <h1>Dashboard</h1>
      <a href="/">Homepage</a>
    </body>
    `);
});

app.get("/api/data", (req, res) => {
  console.log("This is for the data");
  res.send(data);
});

app.post("/api/data", (req, res) => {
  const newData = req.body;
  console.log(newData);
  data.push(newData.name);
  res.sendStatus(201);
});

app.delete("/api/data", (req, res) => {
  data.pop();
  console.log(
    "You have successfully deleted the last element from the data array"
  );
  res.sendStatus(203);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
