import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Temperature } from '.'

const app = () => express(apiRoot, routes)

let temperature

beforeEach(async () => {
  temperature = await Temperature.create({})
})

test('POST /temperatures 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ value: 'test', date: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.value).toEqual('test')
  expect(body.date).toEqual('test')
})

test('GET /temperatures 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /temperatures/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${temperature.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(temperature.id)
})

test('GET /temperatures/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /temperatures/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${temperature.id}`)
    .send({ value: 'test', date: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(temperature.id)
  expect(body.value).toEqual('test')
  expect(body.date).toEqual('test')
})

test('PUT /temperatures/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ value: 'test', date: 'test' })
  expect(status).toBe(404)
})

test('DELETE /temperatures/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${temperature.id}`)
  expect(status).toBe(204)
})

test('DELETE /temperatures/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
