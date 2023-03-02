const express = require('express')
const router = express.Router()
const {postimageupload} = require('../../util/uploadimage.js')
const {createPost , getAllposts , UpdatePost, DeletePost,getOnePost} = require('./controller.js')
const {validateToken ,verifyTokenAndAdmin } = require('./../../../middlewares/validateauth.js')
router.post('/createpost' ,postimageupload,validateToken,async (req,res) => {
     try {
          let {title,body} = req.body;
          let UserId  = req.user.userId;
          let Username = req.user.username;
          let  uploadedImages= req.files.map(file => file.filename)
           const newPost =await createPost({title , body , UserId ,uploadedImages ,Username })

          res.status(200).json(newPost)

     
     } catch (error) {
          res.status(400).json(error.message)
          
     }
 
}  )

router.get('/' , async (req,res) => {
     try {
          const getPosts = await  getAllposts()
          res.status(200).json(getPosts)
     } catch (error) {
          res.status(400).json(error.message)
     }
})

router.get('/:id' , async (req,res) => {
     try {
          
     
          let postId = req.params.id 
    
          const getOne = await getOnePost(postId);
          res.status(200).json(getOne) 
     } catch (error) {
               res.status(404).json(error.message)
     }

})

router.put('/update/:id' , postimageupload,validateToken ,async (req,res) => {
try {
     let PostId = req.params.id
     let {title,body} = req.body;
     let UserId  = req.user.userId;
     let Username = req.user.username;
     let  uploadedImages= req.files.map(file => file.filename)
     const Updatepost =await UpdatePost({title , body , UserId ,uploadedImages ,Username,PostId })
     res.status(201).json(Updatepost)
} catch (error) {
     res.status(400).json(error.message)
}
})

router.delete('/delete/:id' ,validateToken ,async (req,res) => {
     try {
          let PostId = req.params.id;
          let UserId  = req.user.userId;
          const deletepost = await DeletePost({PostId , UserId})
          res.status(201).json(deletepost)
     } catch (error) {
               res.status(400).json(error.message)
     }
} )


module.exports = router