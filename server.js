const express = require("express");
const app = express();

app.get("/events",(req,res)=>{
res.json(["ライブA","ライブB"]);
});

app.listen(3000,() => {
    console.log("サーバーが起動しました");
});
