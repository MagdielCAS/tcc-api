import { RnnModel } from '.'

let rnnModel

beforeEach(async () => {
  rnnModel = await RnnModel.create({ sensor: 'test', model: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = rnnModel.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(rnnModel.id)
    expect(view.sensor).toBe(rnnModel.sensor)
    expect(view.model).toBe(rnnModel.model)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = rnnModel.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(rnnModel.id)
    expect(view.sensor).toBe(rnnModel.sensor)
    expect(view.model).toBe(rnnModel.model)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
