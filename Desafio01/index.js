const express = require('express');
const server = express();
server.use(express.json());

const projects = [];

function idBodyValidator(req, res, next){
    if(!req.body.id){
        return res.status(400).json({"Error": "Id not especified"});
    }
    next();
}

function titleValidator(req, res, next){
    if(!req.body.title){
        return res.status(400).json({"Error": "Title not especified"});
    }
    next();
}

server.post('/projects', idBodyValidator, titleValidator, (req, res)=>{
    const {id} = req.body;
    const {title} = req.body;
    const project = {
        id,
        title,
        tasks:[]
    };
    projects.push(project);
    res.json(projects);
});

server.get('/projects', (req, res)=>{
    res.json(projects);
});

server.put('/projects/:id', titleValidator, (req, res)=>{
    const {id} = req.params;
    const {title} = req.body;
    const project = {
        id,
        title
    }
    projects.forEach((el, i)=>{
        if(el.id == id){
            projects.splice(i, 1, project);
        }
    });
    res.json(projects);
});

server.delete('/projects/:id', (req, res)=>{
    const {id} = req.params;
    projects.forEach((el, i)=>{
        if(el.id == id){
            projects.splice(i, 1);
        }
    });
    res.json(projects);
});

server.post('/projects/:id/task', titleValidator, (req, res)=>{
    const {id} = req.params;
    const {title} = req.body;
    const project = projects.find(el=>{
        return el.id === id;
    });
    project.tasks.push(title);
    res.json(projects);
})

server.listen(3000, ()=>{
    console.log('Listening at 3000');
});