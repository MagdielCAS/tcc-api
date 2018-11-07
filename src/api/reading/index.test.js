import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Reading } from '.'

const app = () => express(apiRoot, routes)

let reading

beforeEach(async () => {
  reading = await Reading.create({})
})

test('POST /readings 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ value: 'test', date: 'test', sensor: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.value).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.sensor).toEqual('test')
})

test('GET /readings 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /readings/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${reading.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(reading.id)
})

test('GET /readings/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /readings/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${reading.id}`)
    .send({ value: 'test', date: 'test', sensor: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(reading.id)
  expect(body.value).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.sensor).toEqual('test')
})

test('PUT /readings/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ value: 'test', date: 'test', sensor: 'test' })
  expect(status).toBe(404)
})

test('DELETE /readings/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${reading.id}`)
  expect(status).toBe(204)
})

test('DELETE /readings/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
