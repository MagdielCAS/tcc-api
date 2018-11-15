import { Router } from 'express';
import { create } from './controller';

const router = new Router();

/**
 * @api {post} /SensorConfigurations Create sensor configuration
 * @apiName CreateSensorConfiguration
 * @apiGroup SensorConfiguration
 * @apiParam sensor Sensor configuration's sensor.
 * @apiParam config Sensor configuration's config.
 * @apiSuccess {Object} sensorConfiguration Sensor configuration's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Sensor configuration not found.
 */
router.post('/', create);

export default router;
