const express = require('express')
const router = express.Router();
const {validateToken} = require('./../../../middlewares/validateauth.js')
const {GetAllComments , CreateComment , UpdateComment,DeleteComment} = require('./controller.js')
router.get('/:id' , async (req,res) => {
     try {
          let Postid = req.params.id;

          const getComments = await GetAllComments({Postid})
          res.status(200).json(getComments)
     } catch (error) {
          res.status(404).json(error.message)
     }
})

router.post('/:id' ,validateToken, async (req,res) => {
     try {
         
          let username = req.user.username;
          let UserImage= req.user.image;
          let body = req.body.body;
          let UserId = req.user.userId
          let PostId = req.params.id
          const createComment = await CreateComment({username,UserImage,body,UserId,PostId});

          res.status(200).json(createComment)
     } catch (error) {
          res.status(400).json(error.message)
     }
})


router.put('/update/:id' ,validateToken  , async (req,res) => {
     try {
          
          let body = req.body.body;
          let UserId = req.user.userId;
          let PostId = req.params.id;
          const Updatecomment = await UpdateComment({body , UserId,PostId});

          res.status(201).json(Updatecomment)
     } catch (error) {
          res.status(400).json(error.message)
     }
} )

router.delete('/delet/:id' ,validateToken , async (req,res) => {
     try {
       
          let UserId = req.user.userId;
          let PostId = req.params.id;

          const deleteCommnt = await DeleteComment({UserId,PostId})

          res.status(200).json(deleteCommnt)
          
     } catch (error) {
          res.status(400).json(error.message)
     }
})


module.exports = router
