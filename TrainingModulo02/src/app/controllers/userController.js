import User from '../models/User'

class UserController{
    async getUser(req, res){
        const Users = await User.findAll();
        res.json({"Users": Users});
    }

    async store(req, res){
        const emailDuplicated = await User.findOne({where:{email: req.params.email}});

        if(emailDuplicated){
            return res.json({'Error': 'E-mail already exists'}).status(401);
        }

        const {id, name, email} = await User.create(req.body);
        res.json({
            id,
            name,
            email
        });
    }
}

export default new UserController();