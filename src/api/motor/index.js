import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Motor, { schema } from './model'

const router = new Router()
const { label, power, location } = schema.tree

/**
 * @api {post} /motors Create motor
 * @apiName CreateMotor
 * @apiGroup Motor
 * @apiParam label Motor's label.
 * @apiParam power Motor's power.
 * @apiParam location Motor's location.
 * @apiSuccess {Object} motor Motor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Motor not found.
 */
router.post('/',
  body({ label, power, location }),
  create)

/**
 * @api {get} /motors Retrieve motors
 * @apiName RetrieveMotors
 * @apiGroup Motor
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of motors.
 * @apiSuccess {Object[]} rows List of motors.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /motors/:id Retrieve motor
 * @apiName RetrieveMotor
 * @apiGroup Motor
 * @apiSuccess {Object} motor Motor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Motor not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /motors/:id Update motor
 * @apiName UpdateMotor
 * @apiGroup Motor
 * @apiParam label Motor's label.
 * @apiParam power Motor's power.
 * @apiParam location Motor's location.
 * @apiSuccess {Object} motor Motor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Motor not found.
 */
router.put('/:id',
  body({ label, power, location }),
  update)

/**
 * @api {delete} /motors/:id Delete motor
 * @apiName DeleteMotor
 * @apiGroup Motor
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Motor not found.
 */
router.delete('/:id',
  destroy)

export default router
