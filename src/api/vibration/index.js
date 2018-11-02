import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { create, index, show, update, destroy } from './controller';
import { schema } from './model';
export Vibration, { schema } from './model';

const router = new Router();
const { value, date, sensor } = schema.tree;

/**
 * @api {post} /vibrations Create vibration
 * @apiName CreateVibration
 * @apiGroup Vibration
 * @apiParam value Vibration's value.
 * @apiParam date Vibration's date.
 * @apiSuccess {Object} vibration Vibration's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Vibration not found.
 */
router.post('/', create);

/**
 * @api {get} /vibrations Retrieve vibrations
 * @apiName RetrieveVibrations
 * @apiGroup Vibration
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of vibrations.
 * @apiSuccess {Object[]} rows List of vibrations.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', query(), index);

/**
 * @api {get} /vibrations/:id Retrieve vibration
 * @apiName RetrieveVibration
 * @apiGroup Vibration
 * @apiSuccess {Object} vibration Vibration's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Vibration not found.
 */
router.get('/:id', show);

/**
 * @api {put} /vibrations/:id Update vibration
 * @apiName UpdateVibration
 * @apiGroup Vibration
 * @apiParam value Vibration's value.
 * @apiParam date Vibration's date.
 * @apiSuccess {Object} vibration Vibration's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Vibration not found.
 */
router.put('/:id', body({ value, date, sensor }), update);

/**
 * @api {delete} /vibrations/:id Delete vibration
 * @apiName DeleteVibration
 * @apiGroup Vibration
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Vibration not found.
 */
router.delete('/:id', destroy);

export default router;
