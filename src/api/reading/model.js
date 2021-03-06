import mongoose, { Schema } from 'mongoose';

const readingSchema = new Schema(
  {
    value: {
      type: String,
      required: true
    },
    date: {
      type: String
    },
    sensor: {
      type: Schema.Types.ObjectId,
      ref: 'Sensor',
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      }
    }
  }
);

readingSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      value: this.value,
      date: this.date,
      sensor: this.sensor,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full
      ? {
          ...view
          // add properties for a full view
        }
      : view;
  }
};

const model = mongoose.model('Reading', readingSchema);

export const schema = model.schema;
export default model;
