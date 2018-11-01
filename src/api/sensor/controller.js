import { success, notFound } from '../../services/response/'
import { Sensor } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Sensor.create(body)
    .then((sensor) => sensor.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Sensor.count(query)
    .then(count => Sensor.find(query, select, cursor)
      .then((sensors) => ({
        count,
        rows: sensors.map((sensor) => sensor.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Sensor.findById(params.id)
    .then(notFound(res))
    .then((sensor) => sensor ? sensor.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Sensor.findById(params.id)
    .then(notFound(res))
    .then((sensor) => sensor ? Object.assign(sensor, body).save() : null)
    .then((sensor) => sensor ? sensor.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Sensor.findById(params.id)
    .then(notFound(res))
    .then((sensor) => sensor ? sensor.remove() : null)
    .then(success(res, 204))
    .catch(next)
