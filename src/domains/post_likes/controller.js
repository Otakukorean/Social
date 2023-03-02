const {Likes} = require('../../../models')

const LikeDisLike = async (data) => {
     let {username,userImage,PostId,UserId} = data;
     const checkiflikes = await Likes.findOne({where : { PostId : PostId ,UserId : UserId , username:username}})

     if(checkiflikes) {
          await Likes.destroy({where : {PostId : PostId ,UserId : UserId , username:username}})
          return false
        
     }
     else {
          await Likes.create({username : username , userImage : userImage ,PostId : PostId,UserId :UserId , count : 1 })
          return true
     }
    


}
const CheckiFLike =async (data) => {
     let {username,PostId,UserId} = data;
     const check = await Likes.findOne({where : { PostId : PostId ,UserId : UserId , username:username}});

     if(!check) {
          return false;
     }
     return true
}

module.exports = {LikeDisLike , CheckiFLike}