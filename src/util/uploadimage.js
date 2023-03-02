const multer = require("multer");
const mimeTypesFilter = require('@meanie/multer-mime-types-filter');

let fileSize = 1048576 //10mb
  const profilestorage = multer.diskStorage({
     destination : (req,file,cb) => {
       cb(null , 'Media/Uploads')
     },
     filename : (req,file,cb) => {
       const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g,'-')}`;
       cb(null , fileName)
     }
    })

    const Profileimageupload = multer({storage : profilestorage}).single('image')
  const profilebgstorage = multer.diskStorage({
     destination : (req,file,cb) => {
       cb(null , 'Media/ProfileBackground')
     },
     filename : (req,file,cb) => {
       const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g,'-')}`;
       cb(null , fileName)
     }
    })

    const Profilebgimageupload = multer({storage : profilebgstorage}).single('image')
  const poststorage = multer.diskStorage({
     destination : (req,file,cb) => {
       cb(null , 'Media/video')
     },
     filename : (req,file,cb) => {
       const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g,'-')}`;
       cb(null , fileName)
     }
    })

    const fileFilterVideo = (req, file, cb) => {
      const filelength = parseInt(req.headers["content-length"])
      if(file.mimetype === 'video/mp4' || file.mimetype === 'video/wmv' || file.mimetype === 'video/webm' || file.mimetype === 'video/mkv' || file.mimetype === 'video/mov' ||file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||file.mimetype === 'image/gif' ){
          cb(null,true);
      }
      else if ( filelength > fileSize) {
        return cb(JSON.stringify("file too big"))
      }
      
      else{
        return cb(new Error('Wrong file type'));
      }


  };
    
    const mimeTypes = ['image/jpeg', 'image/png', 'image/gif' , 'video/mp4' , 'video/wmv' , 'video/webm' , 'video/mkv' , 'video/mov']
const postimageupload = multer({storage : poststorage , fileFilter:fileFilterVideo , limits : {fileSize : fileSize} }).array('uploadedImages', 2)
module.exports = {
  Profileimageupload ,
  Profilebgimageupload ,
  postimageupload
};