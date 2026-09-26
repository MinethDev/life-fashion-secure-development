import express from 'express';
import { login, verify, signup  } from '../controllers/authController.js';
import authMiddlware from '../middleware/authMiddlware.js';
//import { verify } from 'jsonwebtoken';


const router = express.Router();

router.post('/login', login)
router.post('/signup', signup)
router.get('/verify', authMiddlware, verify);

export default router;