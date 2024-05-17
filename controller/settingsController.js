const { Settings } = require('../entity/Settings')
const jwt = require('jsonwebtoken');
const options = require("../options");

const generateAccessToken = (user) => {
    return jwt.sign(user, options.TOKEN, { expiresIn: '222230s' });
}

class SettingsController {

    // async create(req, res, next) {
    //     try {

    //         let { name1, name2, email, password } = req.body
    //         let user = await Users.create({
    //             first_name: name1,
    //             surname: name2,
    //             email: email,
    //             password: password
    //         });

    //         return res.json(user)
    //     } catch (e) {
    //         console.log(e)
    //     }

    // }

    async update(req, res, next) {
        try {
            console.log(Object.entries(req.body)[1]);
            Object.entries(req.body).forEach((el) => {
                Settings.findOne({ where: { id: el[1].id } }).then(obj => {
                    obj.val = el[1].val
                    obj.save()

                })
            })
            // let cat = await Categories.findOne({ where: { id: category_id } })

            // let art = await Articles.findOne({ where: { id: id } })
            // if (req.file) {
            //     art.articleImg = req.file.path
            // }
            // art.title = title
            // art.descr = descr
            // art.slug = slug
            // art.setCategory(cat)
            // art.text = text
            // art.save()
            return res.status(200).send({ message: "Успешно!" })
        } catch (e) {
            console.log(e)
        }

    }
    async getAll(req, res) {
        try {
            let sets = await Settings.findAll()
            return res.json(sets)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new SettingsController()