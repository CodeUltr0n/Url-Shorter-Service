const express = require("express")
const urlRouter = require("./routes/url")
const app = express();
const PORT = 8001;
require('dotenv').config();
const cors = require("cors");
const URL = require('./models/url')
const{connectTOMongoDB} = require("./connect");
const { default: mongoose } = require("mongoose");
import path from "path";


dotenv.config();

connectTOMongoDB('mongodb://localhost:')
.then(()=> console.log("mongodb is connected"))


app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use("/url",urlRouter)

app.get('/:shortID', async (req, res) => {
  const shortid = req.params.shortID;

  const entry = await URL.findOneAndUpdate(
    { shortId: shortid },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { new: true }
  );

  if (entry) {
    res.redirect(entry.redirectURL);
  } else {
    res.status(404).send("Short URL not found");
  }
});

// app.use(express.static(path.join(_dirname,"/frontend/dist")));
// app.get('*',(req,res)=>{
//   res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
// })

app.listen(PORT,()=> console.log(`server started at PORT:${PORT}`))