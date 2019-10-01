import User from '../models/User';

class UserController {
    async store(req, res){
        const userExists = await User.findOne({where:{email: req.body.email}});
        if(userExists){
            res.json({message:'E-mail already exists in database'}).status(400);
        }
        const {id, name, email, provider} = await User.create(req.body);
        res.json({
            id,
            name,
            email,
            provider
        });
    }

    async listAll(req, res){
        const users = await User.findAll();
        res.json(users);
    }


}

export default new UserController();