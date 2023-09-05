const router=require('express').Router();
const {getAllNews,getNewsById,postNews,updateNews,deleteNews}=require('../controller/newsController.js')
router.route('/').get(getAllNews)
router.route('/get/:_id').get(getNewsById)
router.route('/create').post(postNews)
router.route('/update/:_id').patch(updateNews)
router.route('/delete/:_id').delete(deleteNews)

module.exports=router
