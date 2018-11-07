import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Reading, { schema } from './model'

const router = new Router()
const { value, date, sensor } = schema.tree

/**
 * @api {post} /readings Create reading
 * @apiName CreateReading
 * @apiGroup Reading
 * @apiParam value Reading's value.
 * @apiParam date Reading's date.
 * @apiParam sensor Reading's sensor.
 * @apiSuccess {Object} reading Reading's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reading not found.
 */
router.post('/',
  body({ value, date, sensor }),
  create)

/**
 * @api {get} /readings Retrieve readings
 * @apiName RetrieveReadings
 * @apiGroup Reading
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of readings.
 * @apiSuccess {Object[]} rows List of readings.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /readings/:id Retrieve reading
 * @apiName RetrieveReading
 * @apiGroup Reading
 * @apiSuccess {Object} reading Reading's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reading not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /readings/:id Update reading
 * @apiName UpdateReading
 * @apiGroup Reading
 * @apiParam value Reading's value.
 * @apiParam date Reading's date.
 * @apiParam sensor Reading's sensor.
 * @apiSuccess {Object} reading Reading's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reading not found.
 */
router.put('/:id',
  body({ value, date, sensor }),
  update)

/**
 * @api {delete} /readings/:id Delete reading
 * @apiName DeleteReading
 * @apiGroup Reading
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Reading not found.
 */
router.delete('/:id',
  destroy)

export default router
