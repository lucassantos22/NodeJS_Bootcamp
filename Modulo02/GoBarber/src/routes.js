import {Router} from 'express';
const routes = new Router();
import UserController from "./app/controllers/UserController";

routes.post('/users', UserController.store);
routes.get('/users', UserController.listAll);

export default routes;