import { Reading } from '.'

let reading

beforeEach(async () => {
  reading = await Reading.create({ value: 'test', date: 'test', sensor: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = reading.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(reading.id)
    expect(view.value).toBe(reading.value)
    expect(view.date).toBe(reading.date)
    expect(view.sensor).toBe(reading.sensor)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = reading.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(reading.id)
    expect(view.value).toBe(reading.value)
    expect(view.date).toBe(reading.date)
    expect(view.sensor).toBe(reading.sensor)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
