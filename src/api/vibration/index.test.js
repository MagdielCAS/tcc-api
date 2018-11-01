import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Vibration } from '.'

const app = () => express(apiRoot, routes)

let vibration

beforeEach(async () => {
  vibration = await Vibration.create({})
})

test('POST /vibrations 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ value: 'test', date: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.value).toEqual('test')
  expect(body.date).toEqual('test')
})

test('GET /vibrations 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /vibrations/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${vibration.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(vibration.id)
})

test('GET /vibrations/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /vibrations/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${vibration.id}`)
    .send({ value: 'test', date: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(vibration.id)
  expect(body.value).toEqual('test')
  expect(body.date).toEqual('test')
})

test('PUT /vibrations/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ value: 'test', date: 'test' })
  expect(status).toBe(404)
})

test('DELETE /vibrations/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${vibration.id}`)
  expect(status).toBe(204)
})

test('DELETE /vibrations/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
