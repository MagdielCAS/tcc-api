import { Temperature } from '.'

let temperature

beforeEach(async () => {
  temperature = await Temperature.create({ value: 'test', date: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = temperature.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(temperature.id)
    expect(view.value).toBe(temperature.value)
    expect(view.date).toBe(temperature.date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = temperature.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(temperature.id)
    expect(view.value).toBe(temperature.value)
    expect(view.date).toBe(temperature.date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
