import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { create, index, show, update, destroy } from './controller';
import { schema } from './model';
export Temperature, { schema } from './model';

const router = new Router();
const { value, date, sensor } = schema.tree;

/**
 * @api {post} /temperatures Create temperature
 * @apiName CreateTemperature
 * @apiGroup Temperature
 * @apiParam value Temperature's value.
 * @apiParam date Temperature's date.
 * @apiSuccess {Object} temperature Temperature's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Temperature not found.
 */
router.post('/', create);

/**
 * @api {get} /temperatures Retrieve temperatures
 * @apiName RetrieveTemperatures
 * @apiGroup Temperature
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of temperatures.
 * @apiSuccess {Object[]} rows List of temperatures.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', query(), index);

/**
 * @api {get} /temperatures/:id Retrieve temperature
 * @apiName RetrieveTemperature
 * @apiGroup Temperature
 * @apiSuccess {Object} temperature Temperature's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Temperature not found.
 */
router.get('/:id', show);

/**
 * @api {put} /temperatures/:id Update temperature
 * @apiName UpdateTemperature
 * @apiGroup Temperature
 * @apiParam value Temperature's value.
 * @apiParam date Temperature's date.
 * @apiSuccess {Object} temperature Temperature's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Temperature not found.
 */
router.put('/:id', body({ value, date, sensor }), update);

/**
 * @api {delete} /temperatures/:id Delete temperature
 * @apiName DeleteTemperature
 * @apiGroup Temperature
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Temperature not found.
 */
router.delete('/:id', destroy);

export default router;
