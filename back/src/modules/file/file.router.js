import express from 'express'
import multer from 'multer'

import { authAdmin, authUser } from '../../middleware/authMiddleware.js'
import { logsFilesReqRes } from '../../middleware/logsReqRes.js'
import { logsFilesReqResTelegram } from '../../middleware/logsReqResTelegram.js'

import { FileController } from './file.controller.js'

const router = express.Router()

router
	.route('/')
	.post(
		authUser,
		authAdmin,
		multer().any(),
		logsFilesReqRes,
		logsFilesReqResTelegram,
		FileController
	)

export default router
