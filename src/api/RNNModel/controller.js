import { success, notFound } from '../../services/response/'
import { RnnModel } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  RnnModel.create(body)
    .then((rnnModel) => rnnModel.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  RnnModel.count(query)
    .then(count => RnnModel.find(query, select, cursor)
      .then((rnnModels) => ({
        count,
        rows: rnnModels.map((rnnModel) => rnnModel.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  RnnModel.findById(params.id)
    .then(notFound(res))
    .then((rnnModel) => rnnModel ? rnnModel.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  RnnModel.findById(params.id)
    .then(notFound(res))
    .then((rnnModel) => rnnModel ? Object.assign(rnnModel, body).save() : null)
    .then((rnnModel) => rnnModel ? rnnModel.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  RnnModel.findById(params.id)
    .then(notFound(res))
    .then((rnnModel) => rnnModel ? rnnModel.remove() : null)
    .then(success(res, 204))
    .catch(next)
