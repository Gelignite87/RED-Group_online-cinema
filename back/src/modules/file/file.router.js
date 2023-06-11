import express from 'express'
import multer from 'multer'

import { logsFilesToTelegram } from '../../helpers/logsToTelegram.js'
import { authAdmin } from '../../middleware/authAdminMiddleware.js'

import { FileController } from './file.controller.js'

const router = express.Router()

router
	.route('/')
	.post(authAdmin, multer().any(), logsFilesToTelegram, FileController)

export default router
