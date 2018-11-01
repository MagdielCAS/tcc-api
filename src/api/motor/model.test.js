import { Motor } from '.'

let motor

beforeEach(async () => {
  motor = await Motor.create({ label: 'test', power: 'test', location: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = motor.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(motor.id)
    expect(view.label).toBe(motor.label)
    expect(view.power).toBe(motor.power)
    expect(view.location).toBe(motor.location)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = motor.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(motor.id)
    expect(view.label).toBe(motor.label)
    expect(view.power).toBe(motor.power)
    expect(view.location).toBe(motor.location)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
