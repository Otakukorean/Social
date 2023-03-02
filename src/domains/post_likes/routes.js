const express = require('express')
const router = express.Router();
const {validateToken  } = require('./../../../middlewares/validateauth.js')
const {LikeDisLike , CheckiFLike} =require('./controller.js')

router.get('/checkislike' ,validateToken , async (req,res) => {
     let username = req.user.username
     let PostId = req.body.PostId;
     let UserId = req.user.userId
     try {
          const check = await CheckiFLike({username ,PostId ,UserId })
          res.status(200).json(check)
     } catch (error) {
          res.status(400).json(error.message)
     }
} )

router.post('/:id' , validateToken ,async (req,res) => {
     try {
          let username = req.user.username
          let userImage = req.user.image
          let PostId = req.params.id;
          let UserId = req.user.userId
          const LikeDislike = await LikeDisLike({username ,userImage,PostId, UserId})
          res.status(200).json(LikeDislike)
     } catch (error) {
          res.status(400).json(error.message)
     }

})

module.exports = router