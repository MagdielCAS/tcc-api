import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { RnnModel } from '.'

const app = () => express(apiRoot, routes)

let rnnModel

beforeEach(async () => {
  rnnModel = await RnnModel.create({})
})

test('POST /RNNModels 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ sensor: 'test', model: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.sensor).toEqual('test')
  expect(body.model).toEqual('test')
})

test('GET /RNNModels 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /RNNModels/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${rnnModel.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(rnnModel.id)
})

test('GET /RNNModels/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /RNNModels/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${rnnModel.id}`)
    .send({ sensor: 'test', model: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(rnnModel.id)
  expect(body.sensor).toEqual('test')
  expect(body.model).toEqual('test')
})

test('PUT /RNNModels/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ sensor: 'test', model: 'test' })
  expect(status).toBe(404)
})

test('DELETE /RNNModels/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${rnnModel.id}`)
  expect(status).toBe(204)
})

test('DELETE /RNNModels/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
