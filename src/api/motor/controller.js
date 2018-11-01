import { success, notFound } from '../../services/response/'
import { Motor } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Motor.create(body)
    .then((motor) => motor.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Motor.count(query)
    .then(count => Motor.find(query, select, cursor)
      .then((motors) => ({
        count,
        rows: motors.map((motor) => motor.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Motor.findById(params.id)
    .then(notFound(res))
    .then((motor) => motor ? motor.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Motor.findById(params.id)
    .then(notFound(res))
    .then((motor) => motor ? Object.assign(motor, body).save() : null)
    .then((motor) => motor ? motor.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Motor.findById(params.id)
    .then(notFound(res))
    .then((motor) => motor ? motor.remove() : null)
    .then(success(res, 204))
    .catch(next)
