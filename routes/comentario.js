var express = require('express');
var router = express.Router();
const mongooseDB = require('../model/connection')
const commentDB = require('../model/comentarios')
const postDB = require('../model/posts')

function checkParam(paramOfBody) {

  var author = paramOfBody.author
  var body = paramOfBody.body
  var post = paramOfBody.post
  if ((!author) || (!body) || (!post)) {
    if (!author) var msg = "O comentário não pode ser enviado sem um autor"

    if (!body) var msg = "O comentário não pode ser enviado sem nenmhum conteúdo"

    if (!post) var msg = "O comentário deve estar vinculado a um post"
    return { msg, isValid: false }
  }
  else return ({ isValid: true })
}


router.route('/blog/comment')
  .get(async function (req, res, next) {
    mongooseDB.conectar()
    try {
      let lastComment = await commentDB.find().sort({ _id: -1 })
      res.json(lastComment)
      mongooseDB.close()
    } catch (err) {
      console.log(err)
      mongooseDB.close()
    }
  })

  .put(async function (req, res, next) {
    let where = req.body.id
    let data = req.body

    mongooseDB.conectar()
    try {
      if ((!where) || (where.length != 24)) {
        let msg = "Para atualizar um comentário, deve ser fornecido um ID com 24 caracteres"
        res.json({ msg })
      }
      else {
        let results = await commentDB.findById(_id = where)
        if (!results) {
          let msg = "comentário não encontrado. Impossível atualizar "
          res.json({ msg })
        }
        else {
          let getIdPost = await postDB.find({ idComments: where })
          let updateComment = await commentDB.findByIdAndUpdate(where, data)
          await postDB.findByIdAndUpdate(getIdPost._id, data.body)
          res.json(updateComment)
        }
      }
      mongooseDB.close()
    }
    catch (err) {
      console.log(err)
      mongooseDB.close()
    }
  })

  .post(async function (req, res, next) {
    let data = req.body
    let idPost = data.post

    let isNotValid = checkParam(data)

    mongooseDB.conectar()
    try {
      if (isNotValid.isValid == true) {
        let thePost = await postDB.findById(idPost)

        if (thePost) {
          let comment = await commentDB.create(data)
          let addCommentPost = await postDB.findByIdAndUpdate(idPost, { $set: { listComments: data.body, idComments: comment._id } })
          res.json(comment)
        }
        else {
          let msg = "Impossível criar comentário "
          res.json(msg)
        }
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

  .delete(async function (req, res, next) {
    mongooseDB.conectar()

    try {
      let id = req.body.id
      if ((!id) || (id.length != 24)) {
        let msg = "Para deletar um comentário, deve ser fornecido um ID com 24 caracteres"
        res.json({ msg })
      }
      else {
        let results = await commentDB.findById(_id = id)
        if (!results) {
          let msg = "Comentário não encontrado. Impossível deletar "
          res.json({ msg })
        }
        else {
          let excluir = await commentDB.findByIdAndDelete(id)
          await postDB.deleteOne({ idComments: id })
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
