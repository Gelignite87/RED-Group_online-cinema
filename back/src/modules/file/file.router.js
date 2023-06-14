import express from 'express'
import multer from 'multer'

import { logsFilesReqRes } from '../../helpers/logsReqRes.js'
import { authAdmin } from '../../middleware/authAdminMiddleware.js'

import { FileController } from './file.controller.js'

const router = express.Router()

router
	.route('/')
	.post(authAdmin, multer().any(), logsFilesReqRes, FileController)

export default router
