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

function idPathValidator(req, res, next){
    if(!req.params.id){
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

server.put('/projects/:id', idPathValidator, titleValidator, (req, res)=>{
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

server.delete('/projects/:id', idPathValidator, (req, res)=>{
    const {id} = req.params;
    projects.forEach((el, i)=>{
        if(el.id == id){
            projects.splice(i, 1);
        }
    });
    res.json(projects);
});

server.listen(3000, ()=>{
    console.log('Listening at 3000');
});