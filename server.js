const express = require('express')
const cors = require('cors')
const middleware = require('./middleware')
const service = require("./service")
const app = express();
require("./mongoose")

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.post("/login",middleware.generateToken);
app.get("/dashboard",middleware.validateToken,service.getDashboard);
app.get("/tasks",middleware.validateToken,service.getTasks);
app.post("/tasks",middleware.validateToken,service.addTasks);
app.put("/tasks/:id",middleware.validateToken,service.updateTasks);
app.delete("/tasks/:id",middleware.validateToken,service.deleteTasks);

app.listen(PORT,(err,res) => {
    if(err){
        console.error('error occured in server starting...')
        process.exit(1);
    }else{
        console.log(`Server listening @ ${PORT}`)
    }
})