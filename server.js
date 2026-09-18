const express = require("express");
const app = express();
app.use(express.json());


const events = [
  {
    name: "ライブA",
    venue: "東京ドーム"
  },
  {
    name: "ライブB",
    venue: "日本武道館"
  }
];

app.get("/events",(req,res)=>{
res.json(events);
});

app.post("/events",(req,res)=>{
    const newEvent = req.body;
    events.push(newEvent);
    res.json(events);
}
);

app.listen(3000,() => {
    console.log("サーバーが起動しました");
});
