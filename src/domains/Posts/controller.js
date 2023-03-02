const {Posts  , Postimages,Likes,PostComments} = require('../../../models')

const createPost =async (data) => {
     let {title,body,UserId,uploadedImages,Username,PostId} = data;

     const newPost = await Posts.create({
          title : title ,
          body : body , 
          UserId :UserId ,
          username : Username
     }).then((medias) => {
          if(uploadedImages.length) {
               const mediaArr=uploadedImages.map((imagesrc) => {
                    return {
                         PostId : medias.id ,
                         imagesrc
                    }
               })
               return  Postimages.bulkCreate(mediaArr)
          }
     }).catch (error => {
          throw Error(error.message);
     })

     return newPost;

}
const getAllposts = async (data) => {

     const posts = await Posts.findAll({
          include: [{
               model: Postimages,
               attributes : ['id' , 'PostId' , 'imagesrc']
          } ,{
               model: Likes,
               attributes : ['id' , 'count' , 'PostId'] 
          }
          ,{
               model: PostComments,
               attributes : ['id','PostId' , 'body','UserImage' ,'username','createdAt' ] 
          }
     
     ]
     });
     return posts;
}

const getOnePost = async (data) => {
     let postId = data;
     const checkifexist = await Posts.findOne({where : {id :postId}})
     if(!checkifexist){
          throw Error("Post Not Found");
     }
     const posts = await Posts.findOne({where : {id : postId} ,
          include: [{
               model: Postimages,
               attributes : ['id' , 'PostId' , 'imagesrc']
          } ,{
               model: Likes,
               attributes : ['id' , 'count' , 'PostId'] ,
          }
           ,{
               model: PostComments ,
               attributes : ['id','PostId' , 'body','UserImage' ,'username','createdAt' ] 
          }
     
     ]
     })
     return posts;
}

const UpdatePost = async (data) => {
     let {title,body,UserId,uploadedImages,Username,PostId} = data;
     const updatepost = await Posts.update({title : title , body : body} , {where : {id : PostId ,username : Username , UserId : UserId}})
     .then((series) => {
          // find all associated tags from ProductTag
          return Postimages.findAll({ where: { PostId : PostId } });
        })
        .then((productTags) => {
          // get list of current tag_ids
          const productTagIds = uploadedImages.map(({ imagesrc }) => imagesrc);
          // create filtered list of new tag_ids
          const newProductTags = uploadedImages
            .filter((imagesrc) => !productTagIds.includes(imagesrc))
            .map((imagesrc) => {
              return {
               PostId: PostId,
                imagesrc,
              };
            });
          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ imagesrc }) => !uploadedImages.includes(imagesrc))
            .map(({ id }) => id);
    
          // run both actions
          return Promise.all([
          Postimages.destroy({ where: { id: productTagsToRemove } }),
          Postimages.bulkCreate(newProductTags),
          ]);
        })
        .then((updatedProductTags) => updatedProductTags)
        .catch((err) => {
          // console.log(err);
          throw Error(err)
        });
     return updatepost
}

const DeletePost = async (data) => {
     let {PostId ,UserId} = data;

     const DeletePost = await Posts.destroy({
          where : {id :PostId , UserId :UserId  }
     }).then(() => {
          Postimages.destroy({where : {PostId :PostId }})
     })

     return DeletePost;
}


module.exports = {createPost , getAllposts , UpdatePost,DeletePost,getOnePost}