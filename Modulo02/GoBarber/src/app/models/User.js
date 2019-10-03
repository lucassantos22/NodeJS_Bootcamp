import Sequelize, {Model} from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model{
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN
        }, {
            sequelize
        });
        this.addHook('beforeSave', (user)=>{
            user.password_hash = pass
        });
    }
}

export default User;