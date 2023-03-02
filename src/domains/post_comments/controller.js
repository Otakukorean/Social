const {PostComments,Posts} = require('../../../models')

const GetAllComments =async (data) => {
     let {Postid}= data;
     const checkifexiest = await Posts.findOne({where : {id :Postid  }});
     if(!checkifexiest) {
          throw Error("There is No Post With That Id")
     }

     const GetAll =await PostComments.findAll({where : {id :Postid }})

     return GetAll;
}

const CreateComment =async (data) => {
     let {username,UserImage,body,PostId,UserId} = data;
     const checkifexiest = await Posts.findOne({where : {id :PostId  }});
     if(!checkifexiest) {
          throw Error("There is No Post With That Id")
     }
     const createcomment = await PostComments.create({
          username : username ,
          UserImage : UserImage ,
          body : body,
          PostId : PostId ,
          UserId : UserId
     })

     return createcomment
}

const UpdateComment = async (data) => {
     let {body,UserId ,PostId } = data;
     const checkifexiest = await Posts.findOne({where : {id :PostId  }});
     if(!checkifexiest) {
          throw Error("There is No Post With That Id")
     }
     const updatecomment = await PostComments.update({body : body} , {where :{UserId: UserId ,PostId: PostId}})

     return updatecomment
}

const DeleteComment = async (data) => {
     let {UserId ,PostId} = data ;
     const checkifexiest = await Posts.findOne({where : {id :PostId  }});
     if(!checkifexiest) {
          throw Error("There is No Post With That Id")
     }
   
     const deletecomment = await PostComments.destroy({where : {UserId : UserId , PostId : PostId}})
     return deletecomment
}


module.exports = {GetAllComments , CreateComment , UpdateComment,DeleteComment}