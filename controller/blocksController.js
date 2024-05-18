const { Settings } = require('../entity/Settings');
const jwt = require('jsonwebtoken');
const options = require("../options");
const { Blocks } = require('../entity/Blocks');
const { Fields } = require('../entity/Fields');
const { FieldsValues } = require('../entity/FieldsValues');

const generateAccessToken = (user) => {
    return jwt.sign(user, options.TOKEN, { expiresIn: '222230s' });
};

class BlocksController {

    async create(req, res, next) {
        try {

            let { title, descr, slug } = req.body;
            let prevBlock = await Blocks.findOne({ where: { slug: slug } });
            if (prevBlock) {
                return res.status(404).send({ message: "Блок с таким slug уже существует!" });
            }
            let block = await Blocks.create({
                title: title,
                descr: descr,
                slug: slug
            });

            return res.json(block);
        } catch (e) {
            console.log(e);
        }

    }

    async update(req, res, next) {
        try {
            let { id, title, descr, slug, content } = req.body;
            let contForFront = content;
            let block = await Blocks.findOne({
                where: { id: id }
            });
            let oldBlock = await Blocks.findOne({
                where: { slug: slug }
            });
            if (!oldBlock || oldBlock.id == block.id) {
                block.title = title;
                block.descr = descr;
                block.slug = slug;
                block.content = content;
                let reg = /{{{(.*?)}}}/gm;
                let fields = [...content.matchAll(reg)];
                let fieldsRes = [];
                for (const el of fields) {
                    let field = await Fields.findOne({ where: { slug: el[1] } });
                    if (!field) {
                        return res.status(404).send({ message: "Ведённого вами поля " + el[1] + " не существует существует!" });
                    } else {
                        let fvOld = await FieldsValues.findOne({ where: { fieldId: field.id, blockId: id } });
                        console.log(!fvOld);
                        console.log("asd");
                        if (!fvOld) {
                            let fv = await FieldsValues.create({
                                title: field.title,
                                descr: field.descr,
                                slug: field.slug,
                                blockId: id,
                                fieldId: field.id,
                                value: ""
                            });
                            contForFront = contForFront.replace(el[0], "");
                        } else {
                            contForFront = contForFront.replace(el[0], fvOld.value);
                            fieldsRes.push(fvOld.id);
                        }
                    }
                    console.log(el[1]);
                    console.log(fieldsRes);
                }
                block.frontend = contForFront;
                block.fields = fieldsRes.join(",");
                block.save();
                return res.json(block);
            } else {
                return res.status(404).send({ message: "Блок с таким slug уже существует!" });
            }
        } catch (e) {
            console.log(e);
        }
    }

    async updateFields(req, res) {
        try {
            let block = await Blocks.findOne({
                where: { id: Object.entries(req.body)[0][1].blockId }
            });
            let contForFront = block.content;
            for (const el of Object.entries(req.body)) {
                let obj = await FieldsValues.findOne({ where: { id: el[1].id } });
                obj.value = el[1].value;
                contForFront = contForFront.replace("{{{" + el[1].slug + "}}}", el[1].value);
                obj.save();
            }
            console.log(contForFront);
            block.frontend = contForFront;
            block.save();
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
            return res.status(200).send({ message: "Успешно!" });
        } catch (e) {
            console.log(e);
        }
    }

    async getFields(req, res) {
        try {
            let fieldsValues = await FieldsValues.findAll({ where: { blockId: req.params.blockId } });
            return res.json(fieldsValues);
        } catch (e) {
            console.log(e);
        }
    }

    async getAll(req, res) {
        try {
            let blocks = await Blocks.findAll();
            return res.json(blocks);
        } catch (e) {
            console.log(e);
        }
    }

    async delete(req, res) {
        try {
            let block = await Blocks.destroy({ where: { id: req.params.blockId } });
            return res.json(block);
        } catch (e) {
            console.log(e);
        }
    }

    async getOne(req, res) {
        try {
            let block = await Blocks.findOne({
                where: { id: req.params.blockId }
            });
            return res.json(block);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new BlocksController();