import { Router } from 'express';
import { create } from './controller';

const router = new Router();

/**
 * @api {post} /lsarxcalculations Create lsarxcalculation
 * @apiName CreateLsarxcalculation
 * @apiGroup Lsarxcalculation
 * @apiSuccess {Object} lsarxcalculation Lsarxcalculation's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Lsarxcalculation not found.
 */
router.post('/', create);

export default router;
