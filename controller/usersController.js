const { Users } = require('../entity/Users')

class UsersController {
    async create(req, res, next) {
        try {

            let { name1, name2, email, password } = req.body
            let user = await Users.create({
                first_name: name1,
                surname: name2,
                email: email,
                password: password
            });

            return res.json(user)
        } catch (e) {
            console.log(e)
        }

    }

    async getAll(req, res) {
        try {
            let users = await Users.findAll()
            return res.json(users)
        } catch (e) {
            console.log(e)
        }
    }

    // async getOne(req, res) {
    //     const {id} = req.params
    //     const device = await Device.findOne(
    //         {
    //             where: {id},
    //             include: [{model: DeviceInfo, as: 'info'}]
    //         },
    //     )
    //     return res.json(device)
    // }
}

module.exports = new UsersController()