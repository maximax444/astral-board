const { Settings } = require('../entity/Settings')
const jwt = require('jsonwebtoken');
const options = require("../options");
const { Blocks } = require('../entity/Blocks');

const generateAccessToken = (user) => {
    return jwt.sign(user, options.TOKEN, { expiresIn: '222230s' });
}

class BlocksController {

    async create(req, res, next) {
        try {

            let { title, descr, slug } = req.body
            let prevBlock = await Blocks.findOne({where: {slug:slug}})
            if (prevBlock) {
                return res.status(404).send({message: "Блок с таким slug уже существует!"})
            }
            let block = await Blocks.create({
                title: title,
                descr: descr,
                slug: slug
            });

            return res.json(block)
        } catch (e) {
            console.log(e)
        }

    }

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
            let blocks = await Blocks.findAll()
            return res.json(blocks)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new BlocksController()