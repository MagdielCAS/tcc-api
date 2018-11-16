import { Router } from 'express';
import sensor from './sensor';
import motor from './motor';
import reading from './reading'
import lscalculation from './lscalculation'
import rnnModel from './RNNModel'
import rnncalculation from './rnncalculation'
import sensorConfiguration from './SensorConfiguration'
import lsarxcalculation from './lsarxcalculation'

const router = new Router();

router.use('/sensors', sensor);
router.use('/motors', motor);
router.use('/readings', reading)
router.use('/lscalculations', lscalculation)
router.use('/RNNModels', rnnModel)
router.use('/rnncalculations', rnncalculation)
router.use('/SensorConfigurations', sensorConfiguration)
router.use('/lsarxcalculations', lsarxcalculation)

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */

export default router;
