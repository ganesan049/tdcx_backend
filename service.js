const {Task} = require("./model")

const getDashboard = (req,res) => {
    Task.find({}).then(data => {

        let tasksCompleted = data.filter(task => task.completed).length;
        let totalTasks = data.length;
        let latestTasks = data;

        let body = {tasksCompleted,totalTasks,latestTasks};

        res.status(200).send(body);
        
    }).catch(err => {
        console.log(err)
        res.status(401).send("Bad Request. Task details is missing or didn't have a name attribute.");
    })
}
const getTasks = (req,res) => {
    Task.find({}).then(data => {

        res.status(200).send(data);
        
    }).catch(err => {
        console.log(err)
        res.status(401).send("Error in fetching tasks.");
    })
}
const addTasks = (req,res) => {

    let task = new Task({name:req.body.name,completed:false});
    task.save().then(data => {
        res.status(200).send(data);
    }).catch(err => {
        console.log(err)
        res.status(401).send("Bad Request. Task details is missing or didn't have a name attribute.");
    })
    
}
const updateTasks = (req,res) => {
    const {name,completed} = req.body;
    const {id} = req.params;
    console.log(name,completed,id)
    Task.findById(id)
    .then(data => {
        if(!data){
            return res.status(404).send("Not Found. Task was not found.");
        }
        Task.updateOne({_id:id},{$set:{name,completed}}).then((updatedDoc) => {
            return res.status(200).send(updatedDoc)
        });
    })
    .catch(err => {
        console.log(err)
        res.status(404).send("Not Found. Task was not found.");
    })

}
const deleteTasks = (req,res) => {
    const {id} = req.params;

    Task.findById(id)
    .then(data => {
        if(!data){
            return res.status(404).send("Not Found. Task was not found.");
        }
        if(!data.completed){
            Task.findByIdAndDelete({_id:id}).then((data) => {
               return res.status(200).send(data)
            })
        }else{
            return res.status(400).send("Bad Request. Task is marked complete, it cannot be deleted.");
        }
    })
    .catch(err => {
        console.log(err)
        res.status(404).send("Not Found. Task was not found.");
    })

}

module.exports = {getDashboard,deleteTasks,addTasks,updateTasks,getTasks};