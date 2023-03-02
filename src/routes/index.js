const express  = require('express')
const router = express.Router();

const userRoutes = require('./../domains/user/index.js');
const OtpRoutes = require('./../domains/otp/index.js')
const EmailVerificationRoutes = require('./../domains/emailverifi/index.js')
const passwordResetOTP = require('./../domains/forgot_password/index.js')
const PostRoute = require('./../domains/Posts/index.js')
const PostLike = require('./../domains/post_likes/index.js')
const PostComments = require('./../domains/post_comments/index.js')
router.use('/user',userRoutes)
router.use('/otp' , OtpRoutes)
router.use('/emailverification' , EmailVerificationRoutes);
router.use('/resetpassword' ,passwordResetOTP)
router.use('/post' , PostRoute)
router.use('/like' ,PostLike )
router.use('/comment' ,PostComments )


module.exports = router;