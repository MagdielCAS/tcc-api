import mongoose, { Schema } from 'mongoose';

const temperatureSchema = new Schema(
  {
    value: {
      type: String
    },
    date: {
      type: String
    },
    sensor: {
      type: Schema.Types.ObjectId,
      ref: 'Sensor'
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

temperatureSchema.methods = {
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

const model = mongoose.model('Temperature', temperatureSchema);

export const schema = model.schema;
export default model;
