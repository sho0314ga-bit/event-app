const express = require("express");
const Database = require("better-sqlite3");


const app = express();
const db = new Database("events.db");

app.use(express.json());

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

const update = db.prepare(`
  UPDATE events
  SET name = ? , venue = ?
  WHERE id = ?
`);

const deleteEvent = db.prepare(`
  DELETE FROM events
  WHERE id= ?
  `);


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

app.patch("/events/:id",(req,res)=>{
  const newEvent = req.body;

  update.run(newEvent.name,newEvent.venue,req.params.id);

  const rows = select.all();
  res.json(rows);
});

app.delete("/events/:id",(req,res)=>{
  
  deleteEvent.run(req.params.id);

  const rows = select.all();
  res.json(rows);
});

app.listen(3000,() => {
    console.log("サーバーが起動しました");
});
