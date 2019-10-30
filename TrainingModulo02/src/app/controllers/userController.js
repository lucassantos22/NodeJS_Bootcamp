import User from '../models/User'

class UserController{
    async getUser(req, res){
        const Users = await User.findAll();
        res.json({"Users": Users});
    }

    async store(req, res){
        const nameDuplicated = await User.findOne({where:{name: req.body.name}});

        if(nameDuplicated){
            return res.json({'Error': 'Name already exists'}).status(401);
        }

        const {id, name} = await User.create(req.body);
        res.json({
            id,
            name,
        });
    }
}

export default new UserController();