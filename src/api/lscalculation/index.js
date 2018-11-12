import { Router } from 'express';
import { calculate } from './controller';

const router = new Router();

/**
 * @api {get} /lscalculations/:id Retrieve lscalculation
 * @apiName RetrieveLscalculation
 * @apiGroup Lscalculation
 * @apiSuccess {Object} lscalculation Lscalculation's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Lscalculation not found.
 */
// router.get('/', calculate);
router.post('/', calculate);

export default router;
