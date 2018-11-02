import { success, notFound } from '../../services/response/';
import { Temperature } from '.';

export const create = ({ body }, res, next) =>
  Temperature.create(body)
    .then(temperature => temperature.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Temperature.count(query)
    .then(count =>
      Temperature.find(query, select, cursor).then(temperatures => ({
        count,
        rows: temperatures.map(temperature => temperature.view())
      }))
    )
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Temperature.findById(params.id)
    .then(notFound(res))
    .then(temperature => (temperature ? temperature.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Temperature.findById(params.id)
    .then(notFound(res))
    .then(
      temperature =>
        temperature ? Object.assign(temperature, body).save() : null
    )
    .then(temperature => (temperature ? temperature.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Temperature.findById(params.id)
    .then(notFound(res))
    .then(temperature => (temperature ? temperature.remove() : null))
    .then(success(res, 204))
    .catch(next);
