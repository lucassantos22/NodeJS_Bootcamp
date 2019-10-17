import {Router} from 'express'
const routes = new Router();
import UserController from "./app/controllers/userController";

routes.get('/user', UserController.getUser);
routes.post('/user', UserController.store)

export default routes;
