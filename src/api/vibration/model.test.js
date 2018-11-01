import { Vibration } from '.'

let vibration

beforeEach(async () => {
  vibration = await Vibration.create({ value: 'test', date: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = vibration.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(vibration.id)
    expect(view.value).toBe(vibration.value)
    expect(view.date).toBe(vibration.date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = vibration.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(vibration.id)
    expect(view.value).toBe(vibration.value)
    expect(view.date).toBe(vibration.date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
