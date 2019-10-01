import {Router} from 'express';
const routes = new Router();
import User from './app/models/User';

routes.get('/', async (req,res)=>{
    const user = await User.create({
        name: 'Diego',
        email: 'Email',
        password_hash: '123456'
    })
    res.json(user);
})

export default routes;