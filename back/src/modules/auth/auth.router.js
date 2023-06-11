import express from 'express'
import { AuthController } from './auth.controller.js'

const router = express.Router()

router.route('/login').post(AuthController.login)
router.route('/login/access-token').post(AuthController.getNewTokens)
router.route('/register').post(AuthController.register)

export default router
