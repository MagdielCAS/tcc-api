import mongoose, { Schema } from 'mongoose';

const sensorSchema = new Schema(
  {
    label: {
      type: String
    },
    motor: {
      type: Schema.Types.ObjectId,
      ref: 'Motor'
    },
    type: {
      type: String
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

sensorSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      label: this.label,
      motor: this.motor,
      type: this.type,
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

const model = mongoose.model('Sensor', sensorSchema);

export const schema = model.schema;
export default model;
