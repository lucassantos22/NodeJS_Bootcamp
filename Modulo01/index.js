const express = require('express');
const server = express();
server.use(express.json());

const users = ['Lucas', 'Victor', 'João'];

function reqUserExists(req, res, next){
    if(!req.body.name){
        return res.status(400).json({message: 'User not defined'});
    }
    next();
}

function checkUserInArray(req, res, next){
    if(!users[req.params.id]){
        return res.status(400).json({message: 'User not found'});
    }
    next();
}

server.use((req, res, next)=>{
    console.log(`Método da requisição: ${req.method}, URL da requisição: ${req.url}`);
    next();
});

server.get('/users', (req, res)=>{
   res.json({users});
});

server.get('/users/:id', checkUserInArray, (req, res)=> {
    const {id} = req.params;
    res.json({user: users[id]});
});

server.post('/users', reqUserExists, (req, res)=>{
    const {name} = req.body;
    users.push(name);
    res.json({users});
});

server.put('/users/:id', checkUserInArray, reqUserExists, (req, res)=>{
    const {id} = req.params;
    const {name} = req.body;
    users.splice(id, 1, name);
    res.json({users});
});

server.delete('/users/:id', (req, res)=>{
    const {id} = req.params;
    users.splice(id, 1);
    res.send();
});

server.listen(3000, ()=>{
    console.log("Ouvindo na porta 3000");
});