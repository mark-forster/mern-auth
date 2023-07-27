const express= require('express');
const router= express.Router();
const cors= require('cors');
const authController= require('../controllers/auth.controllers');
// Middleware
router.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

// register route
router.post('/register', authController.register);
// login Route
router.post('/login', authController.login);

router.get('/', authController.test);

module.exports = router;