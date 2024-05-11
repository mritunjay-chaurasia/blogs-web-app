const { Router } = require('express');

const {findExistUser,register, login,requestResetPassword,updatePassword,deleteUser } = require('../controllers/auth.controller')

const authRouter = Router()

authRouter.post('/findExistUser',findExistUser)
authRouter.post('/register',register);
authRouter.post('/login', login);
authRouter.post('/reset-password',requestResetPassword);
authRouter.put('/update-password',updatePassword);
authRouter.delete('/deleteUser',deleteUser)

module.exports = authRouter;
