import { Sensor } from '.'

let sensor

beforeEach(async () => {
  sensor = await Sensor.create({ label: 'test', motor: 'test', type: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = sensor.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(sensor.id)
    expect(view.label).toBe(sensor.label)
    expect(view.motor).toBe(sensor.motor)
    expect(view.type).toBe(sensor.type)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = sensor.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(sensor.id)
    expect(view.label).toBe(sensor.label)
    expect(view.motor).toBe(sensor.motor)
    expect(view.type).toBe(sensor.type)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
