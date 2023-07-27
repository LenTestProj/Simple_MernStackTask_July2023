const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const employeeController = require('../controllers/employee.js')
const isAuth=require('../middleware/isAuthenticated');

router.get('/',isAuth,employeeController.fetchEmployees);

router.get('/:empId',isAuth,employeeController.getEmployee);

router.post('/create',isAuth,[body('firstName').trim().isLength({min:1}),body('lastName').trim().isLength({min:1}),body('email').isEmail().normalizeEmail(),body('mobileNumber').trim().isLength({min:8})],employeeController.addEmployee);

router.put('/edit/:empId',isAuth,[body('firstName').trim().isLength({min:1}),body('lastName').trim().isLength({min:1}),body('email').isEmail().normalizeEmail(),body('mobileNumber').trim().isLength({min:8})],employeeController.postEditEmployee)

router.delete('/:empId',isAuth,employeeController.deleteEmployee);

module.exports=router;