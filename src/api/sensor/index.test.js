import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Sensor } from '.'

const app = () => express(apiRoot, routes)

let sensor

beforeEach(async () => {
  sensor = await Sensor.create({})
})

test('POST /sensors 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ label: 'test', motor: 'test', type: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.label).toEqual('test')
  expect(body.motor).toEqual('test')
  expect(body.type).toEqual('test')
})

test('GET /sensors 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /sensors/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${sensor.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(sensor.id)
})

test('GET /sensors/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /sensors/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${sensor.id}`)
    .send({ label: 'test', motor: 'test', type: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(sensor.id)
  expect(body.label).toEqual('test')
  expect(body.motor).toEqual('test')
  expect(body.type).toEqual('test')
})

test('PUT /sensors/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ label: 'test', motor: 'test', type: 'test' })
  expect(status).toBe(404)
})

test('DELETE /sensors/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${sensor.id}`)
  expect(status).toBe(204)
})

test('DELETE /sensors/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
