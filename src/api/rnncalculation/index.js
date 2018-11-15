import { Router } from 'express'
import { create } from './controller'

const router = new Router()

/**
 * @api {post} /rnncalculations Create rnncalculation
 * @apiName CreateRnncalculation
 * @apiGroup Rnncalculation
 * @apiSuccess {Object} rnncalculation Rnncalculation's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Rnncalculation not found.
 */
router.post('/',
  create)

export default router
