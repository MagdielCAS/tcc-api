import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { create, index, show, update, destroy } from './controller';
import { schema } from './model';
export Sensor, { schema } from './model';

const router = new Router();
const { label, motor, type } = schema.tree;

/**
 * @api {post} /sensors Create sensor
 * @apiName CreateSensor
 * @apiGroup Sensor
 * @apiParam label Sensor's label.
 * @apiParam motor Sensor's motor.
 * @apiParam type Sensor's type.
 * @apiSuccess {Object} sensor Sensor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Sensor not found.
 */
router.post('/', body({ label, motor, type }), create);

/**
 * @api {get} /sensors Retrieve sensors
 * @apiName RetrieveSensors
 * @apiGroup Sensor
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of sensors.
 * @apiSuccess {Object[]} rows List of sensors.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', index);

/**
 * @api {get} /sensors/:id Retrieve sensor
 * @apiName RetrieveSensor
 * @apiGroup Sensor
 * @apiSuccess {Object} sensor Sensor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Sensor not found.
 */
router.get('/:id', show);

/**
 * @api {put} /sensors/:id Update sensor
 * @apiName UpdateSensor
 * @apiGroup Sensor
 * @apiParam label Sensor's label.
 * @apiParam motor Sensor's motor.
 * @apiParam type Sensor's type.
 * @apiSuccess {Object} sensor Sensor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Sensor not found.
 */
router.put('/:id', body({ label, motor, type }), update);

/**
 * @api {delete} /sensors/:id Delete sensor
 * @apiName DeleteSensor
 * @apiGroup Sensor
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Sensor not found.
 */
router.delete('/:id', destroy);

export default router;
