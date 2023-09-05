const router=require('express').Router()
const medicineAvailable=require('../models/medicineAvailableModel.js')
const {addMedicineAvailable,getAllAvailable,updateMedicineAvailable,getAvailableById,delAvailableInfo}=require('../controller/medicineAvailbleController.js')
router.route('/').get(getAllAvailable)
router.route('/getAvilableById/:_id').get(getAvailableById)
router.route('/add').post(addMedicineAvailable)
router.route('/update/:_id').patch(updateMedicineAvailable)
router.route('/del/:_id').delete(delAvailableInfo)
module.exports=router