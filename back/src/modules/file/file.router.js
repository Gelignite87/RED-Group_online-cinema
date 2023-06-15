import express from 'express'
import multer from 'multer'

import { logsFilesReqRes } from '../../helpers/logsReqRes.js'
import { authAdmin, authUser } from '../../middleware/authMiddleware.js'

import { FileController } from './file.controller.js'

const router = express.Router()

router
	.route('/')
	.post(authUser, authAdmin, multer().any(), logsFilesReqRes, FileController)

export default router
