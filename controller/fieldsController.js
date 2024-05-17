const { Settings } = require('../entity/Settings')
const jwt = require('jsonwebtoken');
const options = require("../options");
const { Fields } = require('../entity/Fields');
const { log } = require('console');

const generateAccessToken = (user) => {
    return jwt.sign(user, options.TOKEN, { expiresIn: '222230s' });
}

class FieldsController {

    async create(req, res, next) {
        try {
            console.log(req.body)
            let { title, descr, slug } = req.body
            let prevFields = await Fields.findOne({ where: { slug: slug } })
            if (prevFields) {
                return res.status(404).send({ message: "Поле с таким slug уже существует!" })
            }
            let field = await Fields.create({
                title: title,
                descr: descr,
                slug: slug
            });

            return res.json(field)
        } catch (e) {
            console.log(e)
        }

    }

    async update(req, res) {
        try {
            let { id, title, descr, slug } = req.body

            let field = await Fields.findOne({
                where: { id: id }
            })
            let oldField = await Fields.findOne({
                where: { slug: slug }
            })
            if (!oldField || oldField.id == field.id) {
                field.title = title
                field.descr = descr
                field.slug = slug
                field.save()
                return res.json(field)
            } else {
                return res.status(404).send({ message: "Поле с таким slug уже существует!" })
            }
        } catch (e) {
            console.log(e)
        }
    }


    async getAll(req, res) {
        try {
            let fields = await Fields.findAll()
            return res.json(fields)
        } catch (e) {
            console.log(e)
        }
    }

    async delete(req, res) {
        try {
            let field = await Fields.destroy({ where: { id: req.params.fieldId } })
            return res.json(field)
        } catch (e) {
            console.log(e)
        }
    }

    async getOne(req, res) {
        try {
            let field = await Fields.findOne({
                where: { id: req.params.fieldId }
            })
            return res.json(field)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new FieldsController()