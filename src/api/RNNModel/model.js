import mongoose, { Schema } from 'mongoose'

const rnnModelSchema = new Schema({
  sensor: {
    type: String
  },
  model: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

rnnModelSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      sensor: this.sensor,
      model: this.model,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('RnnModel', rnnModelSchema)

export const schema = model.schema
export default model
