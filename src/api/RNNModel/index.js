import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export RnnModel, { schema } from './model'

const router = new Router()
const { sensor, model } = schema.tree

/**
 * @api {post} /RNNModels Create rnn model
 * @apiName CreateRnnModel
 * @apiGroup RnnModel
 * @apiParam sensor Rnn model's sensor.
 * @apiParam model Rnn model's model.
 * @apiSuccess {Object} rnnModel Rnn model's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Rnn model not found.
 */
router.post('/',
  body({ sensor, model }),
  create)

/**
 * @api {get} /RNNModels Retrieve rnn models
 * @apiName RetrieveRnnModels
 * @apiGroup RnnModel
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of rnn models.
 * @apiSuccess {Object[]} rows List of rnn models.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /RNNModels/:id Retrieve rnn model
 * @apiName RetrieveRnnModel
 * @apiGroup RnnModel
 * @apiSuccess {Object} rnnModel Rnn model's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Rnn model not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /RNNModels/:id Update rnn model
 * @apiName UpdateRnnModel
 * @apiGroup RnnModel
 * @apiParam sensor Rnn model's sensor.
 * @apiParam model Rnn model's model.
 * @apiSuccess {Object} rnnModel Rnn model's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Rnn model not found.
 */
router.put('/:id',
  body({ sensor, model }),
  update)

/**
 * @api {delete} /RNNModels/:id Delete rnn model
 * @apiName DeleteRnnModel
 * @apiGroup RnnModel
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Rnn model not found.
 */
router.delete('/:id',
  destroy)

export default router
