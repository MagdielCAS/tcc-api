import { Router } from 'express';
import { calculate } from './controller';

const router = new Router();

/**
 * @api {post} /lscalculations Create lscalculation
 * @apiName CreateLscalculation
 * @apiGroup Lscalculation
 * @apiSuccess {Object} lscalculation Rnncalculation's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Lscalculation not found.
 */
router.post('/', calculate);

export default router;
