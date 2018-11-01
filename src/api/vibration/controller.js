import { success, notFound } from '../../services/response/'
import { Vibration } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Vibration.create(body)
    .then((vibration) => vibration.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Vibration.count(query)
    .then(count => Vibration.find(query, select, cursor)
      .then((vibrations) => ({
        count,
        rows: vibrations.map((vibration) => vibration.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Vibration.findById(params.id)
    .then(notFound(res))
    .then((vibration) => vibration ? vibration.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Vibration.findById(params.id)
    .then(notFound(res))
    .then((vibration) => vibration ? Object.assign(vibration, body).save() : null)
    .then((vibration) => vibration ? vibration.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Vibration.findById(params.id)
    .then(notFound(res))
    .then((vibration) => vibration ? vibration.remove() : null)
    .then(success(res, 204))
    .catch(next)
