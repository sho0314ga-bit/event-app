const express = require("express");
const Database = require("better-sqlite3");
const app = express();
const db = new Database("events.db");


db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    venue TEXT NOT NULL
  )
`);

const insert = db.prepare(`
  INSERT INTO events (name, venue)
  VALUES (?, ?)
`);

const select = db.prepare(`
  SELECT * FROM events
`);

app.use(express.json());


app.get("/events",(req,res)=>{
 const rows = select.all();
    res.json(rows);
});

app.post("/events",(req,res)=>{
    const newEvent = req.body;
    insert.run(newEvent.name,newEvent.venue);
    const rows = select.all();
    res.json(rows);
});

app.listen(3000,() => {
    console.log("サーバーが起動しました");
});
