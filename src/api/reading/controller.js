import { success, notFound } from '../../services/response/'
import { Reading } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Reading.create(body)
    .then((reading) => reading.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Reading.count(query)
    .then(count => Reading.find(query, select, cursor)
      .then((readings) => ({
        count,
        rows: readings.map((reading) => reading.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Reading.findById(params.id)
    .then(notFound(res))
    .then((reading) => reading ? reading.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Reading.findById(params.id)
    .then(notFound(res))
    .then((reading) => reading ? Object.assign(reading, body).save() : null)
    .then((reading) => reading ? reading.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Reading.findById(params.id)
    .then(notFound(res))
    .then((reading) => reading ? reading.remove() : null)
    .then(success(res, 204))
    .catch(next)
