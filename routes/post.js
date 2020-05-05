var express = require('express');
var router = express.Router();
const mongooseDB = require('../model/connection')
const postDB = require('../model/posts')

function checkParam(paramOfBody) {

    let author = paramOfBody.author
    let title = paramOfBody.title
    let body = paramOfBody.body
    if ((!author) || (!title) || (!body)) {
        if (!author) var msg = "O post não pode ser enviado sem um autor"

        if (!title) var msg = "O post não pode ser enviado sem um titulo"

        if (!body) var msg = "O post não pode ser enviado sem nenmhum conteúdo"
        return { msg, isValid: false }
    }
    else return ({ isValid: true })
}

router.route('/blog')

    .get(async function (req, res) {
        mongooseDB.conectar()
        let byId = req.body.id
        try {
            if (byId) {
                let thisPost = await postDB.findById(byId)
                res.json(thisPost)
            }
            else {
                let lastPost = await postDB.find().sort({ _id: -1 })
                res.json(lastPost)
            }
            mongooseDB.close()
        } catch (err) {
            console.log(err)
            mongooseDB.close()
        }
    })

    .put(async function (req, res) {
        let where = req.body.id
        let data = req.body



        mongooseDB.conectar()
        try {
            if ((!where) || (where.length != 24)) {
                let msg = "Para atualizar um post, deve ser fornecido um ID com 24 caracteres"
                res.json({ msg })
            } else {
                let results = await postDB.findById(where)
                if (!results) {
                    let msg = "Post não encontrado. Impossível atualizar "
                    res.json({ msg })
                }

                else {
                    let updatePost = await postDB.findByIdAndUpdate(where, data)
                    res.json(updatePost)
                }
            }
            mongooseDB.close()
        }
        catch (err) {
            console.log(err)
            mongooseDB.close()
        }
    })

    .post(async function (req, res) {
        let data = req.body

        let isNotValid = checkParam(data)

        mongooseDB.conectar()
        try {
            if (isNotValid.isValid == true) {
                let post = await postDB.create(data)
                res.json(post)
            }
            else {
                res.json(isNotValid.msg)
            }
            mongooseDB.close()

        } catch (err) {
            console.log(err)
            mongooseDB.close()
        }
    })

    .delete(async function (req, res) {
        mongooseDB.conectar()

        try {
            let id = req.body.id
            if ((!id) || (id.length != 24)) {
                let msg = "Para deletar um post, deve ser fornecido um ID com 24 caracteres"
                res.json({ msg })
            } else {

                let results = await postDB.findById(id)
                if (!results) {
                    let msg = "Post não encontrado. Impossível deletar "
                    res.json({ msg })
                }
                else {
                    let excluir = await postDB.findByIdAndDelete(id)

                    res.json(excluir)
                }
            }
            mongooseDB.close()
        } catch (err) {
            console.log(err)
            mongooseDB.close()
        }
    })

module.exports = router;