const mongoose = require('mongoose')
const app = require('./app')

//mongoose connection
mongoose.connect("mongodb://localhost:27017/BookMyShow");
mongoose.connection
  .once("open", () => {
    console.log("DB connected");
  })
  .on("error", (error)=> {
    console.log("error is:", error);
  });

//server connection
const PORT = process.env.PORT|| 4000;
app.listen(PORT, (req, res)=>{
    console.log(`its running on port: ${PORT}`);
});
