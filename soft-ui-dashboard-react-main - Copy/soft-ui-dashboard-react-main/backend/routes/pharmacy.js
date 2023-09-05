const router=require("express").Router();
const {getAllPharmacy,getPharmacyById,postPharmacy,updatePharmacy,deletePharmacy}=require('../controller/pharmacyController.js');
router.route('/').get(getAllPharmacy)
router.route('/get/:_id').get(getPharmacyById)
router.route('/post').post(postPharmacy)
router.route('/update/:_id').patch(updatePharmacy)
router.route('/delete/:_id').delete(deletePharmacy)
module.exports=router