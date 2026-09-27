import express from 'express'
import authMiddleware from '../middleware/authMiddlware.js'
import {addEmployee, upload, getEmployees, getEmployee, updateEmployee} from '../controllers/employeeController.js'
import adminMiddleware from '../middleware/adminMiddleware.js'


const router = express.Router()

router.get('/', authMiddleware, adminMiddleware, getEmployees)

router.post('/add', authMiddleware, adminMiddleware, upload.single('image'), addEmployee)

router.get('/:id', authMiddleware, adminMiddleware, getEmployee)

router.put('/:id', authMiddleware, adminMiddleware, updateEmployee)

export default router
