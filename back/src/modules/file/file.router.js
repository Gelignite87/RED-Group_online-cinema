import express from 'express'
import multer from 'multer'

import { authAdmin, authUser } from '../../middleware/authMiddleware.js'
import { logsFilesReqRes } from '../../middleware/logsReqRes.js'

import { FileController } from './file.controller.js'

const router = express.Router()

router
	.route('/')
	.post(authUser, authAdmin, multer().any(), logsFilesReqRes, FileController)

export default router
